import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { FC, PropsWithChildren, useEffect } from "react";

type Props = {
	requireAuth?: boolean;
	redirectOnAuth?: string;
};

const RequireAuthLayout: FC<PropsWithChildren<Props>> = ({
	children,
	requireAuth = false,
	redirectOnAuth,
}) => {
	const { data: session } = useSession();
	const router = useRouter();

	useEffect(() => {
		if (requireAuth && !session) router.push("/");
		// @ts-ignore
	}, []);

	if (session && redirectOnAuth) {
		// @ts-ignore
		router.push(redirectOnAuth);
		return <div>Loading...</div>;
	} else if (requireAuth) {
		if (session) return <main className="h-screen w-screen">{children}</main>;
		return <main className="h-screen w-screen">Forbidden: Auth Required</main>;
	}
	return <main className="h-screen w-screen">{children}</main>;
};

export default RequireAuthLayout;
