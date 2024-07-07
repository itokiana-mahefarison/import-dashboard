import { cn } from "@/lib/utils";
import { Sidebar } from "./Sidebar"
import { Outlet } from "react-router-dom";
import { useFirstRender } from "@/hooks/useFirstRender";
import { useSplashScreen } from "@/hooks/useSpashScreen";
import { useSidebarOpenState } from "../hooks/useSidebarOpenState";

export const MainLayout = () => {
    const [isOpen] = useSidebarOpenState()
	const [isFirstRender] = useFirstRender()
	const {} = useSplashScreen(!isFirstRender)

    return (
		<>
			<Sidebar />
			<main
				className={cn(
					"min-h-[100vh] bg-zinc-50 dark:bg-zinc-900 transition-[margin-left] ease-in-out duration-300",
					isOpen === false ? "lg:ml-[90px]" : "lg:ml-72"
				)}
			>
				 <Outlet />
			</main>
		</>
	);
}