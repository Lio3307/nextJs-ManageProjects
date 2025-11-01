import { Button } from '@/components/ui/button'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'

export default function ContentSection() {
    return (
        <section id="about" className="py-16 md:py-32">
            <div className="mx-auto max-w-5xl px-6">
                <div className="grid gap-6 md:grid-cols-2 md:gap-12">
                    <h2 className="text-4xl font-medium">ProjectHub is a modern project management platform for developers and teams.</h2>
                    <div className="space-y-6">
                        <p>ProjectHub helps you organize projects, manage tasks, collaborate with team members, and track progress all in one place. Built with modern technologies like Next.js 15, TypeScript, and Prisma.</p>
                        <p>
                            Whether youre managing personal projects or collaborating with a team, ProjectHub provides all the tools you need. <span className="font-bold">It supports comprehensive project management</span> — from task tracking to reporting and team collaboration.
                        </p>
                        <Button
                            asChild
                            variant="secondary"
                            size="sm"
                            className="gap-1 pr-1.5">
                            <Link href="/dashboard">
                                <span>Lets Try</span>
                                <ChevronRight className="size-2" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}
