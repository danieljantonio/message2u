import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { type FC, type PropsWithChildren, useEffect } from "react";

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
		if (requireAuth && !session) void router.push("/");
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (session && redirectOnAuth) {
		void router.push(redirectOnAuth);
		return <div>Loading...</div>;
	} else if (requireAuth) {
		if (session) return <main className="h-screen w-screen">{children}</main>;
		return <main className="h-screen w-screen">Forbidden: Auth Required</main>;
	}
	return <main className="h-screen w-screen">{children}</main>;
};

export default RequireAuthLayout;
