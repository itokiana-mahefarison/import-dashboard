import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Ellipsis } from "lucide-react";
import { Link } from "react-router-dom";
import { useMainMenus } from "../hooks/useMainMenus";
import { CollapseMenuButton } from "./CollapseMenuButton";
import _ from 'lodash'

export const Menu = ({ isOpen }: Props) => {
    const menuList = useMainMenus()

    return (
		<ScrollArea className="[&>div>div[style]]:!block">
			<nav className="mt-8 h-full w-full">
				<ul className="flex flex-col items-start space-y-1 px-2">
					{menuList.map(({ groupLabel, menus }, index) => (
						<li
							className={cn("w-full", groupLabel ? "pt-5" : "")}
							key={index}
						>
							{(isOpen && groupLabel) || isOpen === undefined ? (
								<p className="text-sm font-medium text-muted-foreground px-4 pb-2 max-w-[248px] truncate">
									{groupLabel}
								</p>
							) : !isOpen &&
							  isOpen !== undefined &&
							  groupLabel ? (
								<TooltipProvider>
									<Tooltip delayDuration={100}>
										<TooltipTrigger className="w-full">
											<div className="w-full flex justify-center items-center">
												<Ellipsis className="h-5 w-5" />
											</div>
										</TooltipTrigger>
										<TooltipContent side="right">
											<p>{groupLabel}</p>
										</TooltipContent>
									</Tooltip>
								</TooltipProvider>
							) : (
								<p className="pb-2"></p>
							)}
							{menus?.map(
								(
									{
										href,
										label,
										icon: Icon,
										active,
										subMenus,
									},
									index
								) =>
									_.isEmpty(subMenus) ? (
										<div className="w-full" key={index}>
											<TooltipProvider
												disableHoverableContent
											>
												<Tooltip delayDuration={100}>
													<TooltipTrigger asChild>
														<Button
															variant={
																active
																	? "secondary"
																	: "ghost"
															}
															className="w-full justify-start h-10 mb-1"
															asChild
														>
															<Link to={href}>
																<span
																	className={cn(
																		isOpen ===
																			false
																			? ""
																			: "mr-4"
																	)}
																>
																	<Icon
																		size={
																			18
																		}
																	/>
																</span>
																<p
																	className={cn(
																		"max-w-[200px] truncate",
																		isOpen ===
																			false
																			? "-translate-x-96 opacity-0"
																			: "translate-x-0 opacity-100"
																	)}
																>
																	{label}
																</p>
															</Link>
														</Button>
													</TooltipTrigger>
													{isOpen === false && (
														<TooltipContent side="right">
															{label}
														</TooltipContent>
													)}
												</Tooltip>
											</TooltipProvider>
										</div>
									) : (
										<div className="w-full" key={index}>
											<CollapseMenuButton
												icon={Icon}
												label={label}
												active={active}
												subMenus={subMenus}
												isOpen={isOpen}
											/>
										</div>
									)
							)}
						</li>
					))}
				</ul>
			</nav>
		</ScrollArea>
	);
}

type Props = {
    isOpen?: boolean
}