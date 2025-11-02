import Link from 'next/link'

const links = [
    {
        title: "Features",
        href: "#features"
    },
    {
        title: "About",
        href: "#about"
    },
    {
        title: "FAQs",
        href: "#faqs"
    },
]

export default function FooterSection() {
    return (
        <footer className="border-t bg-background py-12">
            <div className="mx-auto max-w-5xl px-6">
                <div className="flex flex-wrap justify-between gap-6">
                    <span className="text-muted-foreground order-last block text-center text-sm md:order-first">© {new Date().getFullYear()} Tailark, All rights reserved</span>
                    <div className="order-first flex flex-wrap justify-center gap-8 text-sm md:order-last">
                        {links.map((link, index) => (
                            <Link
                                key={index}
                                href={link.href}
                                className="text-muted-foreground hover:text-accent-foreground block duration-150">
                                <span>{link.title}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    )
}
