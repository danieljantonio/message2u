import { z } from "zod";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const eventRouter = createTRPCRouter({
	create: protectedProcedure
		.input(
			z.object({
				name: z.string(),
				dedicatedTo: z.string(),
				description: z.string().nullable(),
				link: z.string(),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			console.log(input);
			const newEvent = await ctx.prisma.event.create({
				data: {
					...input,
					ownerId: ctx.session.user.id,
				},
			});
			return newEvent;
		}),
	getAll: protectedProcedure.query(async ({ ctx }) => {
		const events = await ctx.prisma.event.findMany({
			include: {
				messages: true,
			},
		});
		return events;
	}),
	get: publicProcedure.input(z.object({ id: z.string() })).query(async ({ ctx, input }) => {
		const evnt = await ctx.prisma.event.findUniqueOrThrow({
			where: { ...input },
		});
		return evnt;
	}),
	dedicate: publicProcedure
		.input(
			z.object({
				message: z.string(),
				eventId: z.string(),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			console.log(input);

			const message = await ctx.prisma.message.create({
				data: {
					...input,
				},
			});
			return message;
		}),
});
