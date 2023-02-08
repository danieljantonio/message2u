import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

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
});
