import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Head } from "@inertiajs/react";

export default function TermsOfService() {
    return (
        <>
            <Head title="Terms of Service" />
            <div className="container mx-auto py-8 px-4">
                <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
                <Card className="p-6">
                    <ScrollArea className="h-[600px] pr-4">
                        <div className="space-y-6">
                            <section>
                                <h2 className="text-2xl font-semibold mb-3">1. Acceptance of Terms</h2>
                                <p className="text-gray-600">
                                    By accessing and using this website, you accept and agree to be bound by the terms and conditions outlined here.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold mb-3">2. Privacy Policy</h2>
                                <p className="text-gray-600">
                                    Your privacy is important to us. Please review our Privacy Policy to understand how we collect, use, and protect your personal information.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold mb-3">3. User Responsibilities</h2>
                                <p className="text-gray-600">
                                    You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold mb-3">4. Intellectual Property</h2>
                                <p className="text-gray-600">
                                    All content on this website, including text, graphics, logos, and software, is the property of our company and is protected by intellectual property laws.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold mb-3">5. Limitation of Liability</h2>
                                <p className="text-gray-600">
                                    We shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use or inability to use the service.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold mb-3">6. Changes to Terms</h2>
                                <p className="text-gray-600">
                                    We reserve the right to modify these terms at any time. Your continued use of the service following any changes constitutes acceptance of those changes.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold mb-3">7. Contact Information</h2>
                                <p className="text-gray-600">
                                    If you have any questions about these Terms, please contact us at support@example.com.
                                </p>
                            </section>
                        </div>
                    </ScrollArea>
                </Card>
            </div>
        </>
    );
}
