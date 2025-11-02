export default function FAQs() {
    return (
        <section id="faqs" className="scroll-py-16 py-16 md:scroll-py-32 md:py-32">
            <div className="mx-auto max-w-5xl px-6">
                <div className="grid gap-y-12 px-2 lg:[grid-template-columns:1fr_auto]">
                    <div className="text-center lg:text-left">
                        <h2 className="mb-4 text-3xl font-semibold md:text-4xl">
                            Frequently <br className="hidden lg:block" /> Asked <br className="hidden lg:block" />
                            Questions
                        </h2>
                        <p>Common questions about ProjectHub and how to use it effectively.</p>
                    </div>

                    <div className="divide-y divide-dashed sm:mx-auto sm:max-w-lg lg:mx-0">
                        <div className="pb-6">
                            <h3 className="font-medium">How do I create a new project in ProjectHub?</h3>
                            <p className="text-muted-foreground mt-4">Creating a new project is simple. After logging in to your dashboard, click on the &quot;New Project&quot; button and fill in the project details.</p>

                            <ol className="list-outside list-decimal space-y-2 pl-4">
                                <li className="text-muted-foreground mt-4">Provide a name and description for your project</li>
                                <li className="text-muted-foreground mt-4">Set the visibility (public or private)</li>
                                <li className="text-muted-foreground mt-4">Click "Create" to initialize your project</li>
                            </ol>
                        </div>
                        <div className="py-6">
                            <h3 className="font-medium">How can I invite team members to collaborate on a project?</h3>
                            <p className="text-muted-foreground mt-4">As a project owner, you can generate a unique project code that can be shared with team members for them to join your project.</p>
                        </div>
                        <div className="py-6">
                            <h3 className="font-medium">Can I track the progress of my projects?</h3>
                            <p className="text-muted-foreground my-4">Yes, ProjectHub provides comprehensive progress tracking through task completion status and project reports.</p>
                            <ul className="list-outside list-disc space-y-2 pl-4">
                                <li className="text-muted-foreground">Monitor task completion and pending items in your project dashboard</li>
                                <li className="text-muted-foreground">Generate progress reports to review project milestones</li>
                            </ul>
                        </div>
                        <div className="py-6">
                            <h3 className="font-medium">Is my project data secure?</h3>
                            <p className="text-muted-foreground mt-4">Yes, ProjectHub takes security seriously. All data is encrypted and stored securely. We implement industry-standard security practices to protect your project information.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
