import { Separator } from "@/components/ui/separator";
import { ChevronsDownIcon } from "lucide-react";
import Link from "next/link";

export const FooterSection = () => {
    return (
        <footer id="footer" className="container py-24 sm:py-32">
            <div className="p-10 bg-card border border-secondary rounded-2xl">
                <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-x-12 gap-y-8">
                    <div className="col-span-full xl:col-span-2">
                        <Link href="#" className="flex font-bold items-center">
                            <ChevronsDownIcon className="w-9 h-9 mr-2 bg-gradient-to-tr from-primary via-primary/70 to-primary rounded-lg border border-secondary" />

                            <h3 className="text-2xl">Proofly</h3>
                        </Link>
                    </div>

                    <div className="flex flex-col gap-2">
                        <h3 className="font-bold text-lg">Contact</h3>
                        <div>
                            <Link
                                href="https://www.github.com/morii69/proofly"
                                target="_blank"
                                className="opacity-60 hover:opacity-100"
                            >
                                Github
                            </Link>
                        </div>

                        <div>
                            <Link
                                href="https://www.x.com/Ufraan1"
                                target="_blank"
                                className="opacity-60 hover:opacity-100"
                            >
                                Twitter
                            </Link>
                        </div>

                        <div>
                            <Link
                                href="https://www.instagram.com/ufraaan"
                                target="_blank"
                                className="opacity-60 hover:opacity-100"
                            >
                                Instagram
                            </Link>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <h3 className="font-bold text-lg">Help</h3>
                        <div>
                            <Link
                                href="/contact"
                                target="_blank"
                                className="opacity-60 hover:opacity-100"
                            >
                                Contact Us
                            </Link>
                        </div>

                        <div>
                            <Link
                                href="#faq"
                                className="opacity-60 hover:opacity-100"
                            >
                                FAQ
                            </Link>
                        </div>
                    </div>
                </div>

                <Separator className="my-6" />
                <section className="flex justify-center items-center">
                    <h3 className="text-center">&copy; 2024 Proofly</h3>
                </section>
            </div>
        </footer>
    );
};
