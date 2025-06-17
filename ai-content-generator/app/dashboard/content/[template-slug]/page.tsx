"use client";
import React, { useContext, useState } from "react";
import { useParams } from "next/navigation";
import FormSection from "../_components/FormSection";
import OutputSection from "../_components/OutputSection";
import { TEMPLATE } from "../../_components/TemplateList";
import Templates from "@/app/(data)/Templates";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { generateGeminiContent } from "@/utils/AiModel";
import { db } from "@/utils/db";
import { AIOutput } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { TotalUsageContext } from "@/app/(context)/TotalUsageContext";
import { useRouter } from "next/navigation";

const CreateNewContent = () => {
    const [loading, setLoading] = useState(false);
    const [aiOutput, setAiOutput] = useState<string>("");
    const [usedCredits, setUsedCredits] = useContext(TotalUsageContext);
    const [error, setError] = useState("");
    const params = useParams();
    const router = useRouter();
    const templateSlug = params?.["template-slug"];
    const { user } = useUser();

    const selectedTemplate: TEMPLATE | undefined = Templates?.find(
        (item) => item.slug === templateSlug
    );

    const GenrateAIContent = async (formData: any) => {
        if (usedCredits > 10000) {
            router.push('/dashboard/billing')
        }
        setLoading(true);
        setError("");
        setAiOutput("");
        try {
            const selectedPrompt = selectedTemplate?.aiPrompt || "";
            const finalAIPrompt = JSON.stringify(formData) + ", " + selectedPrompt;
            const result = await generateGeminiContent(finalAIPrompt);
            setAiOutput(result);
            await savedb(formData, selectedTemplate?.slug, result);
        } catch (err: any) {
            console.error(err);
            setError("Something went wrong while generating content.");
        } finally {
            setLoading(false);
        }
    };

    const savedb = async (
        formData: any,
        slug: string | undefined,
        aiResp: string
    ) => {
        if (!user?.primaryEmailAddress?.emailAddress) return;

        try {
            const result = await db.insert(AIOutput).values({
                formData,
                templateSlug: slug,
                aiResponse: aiResp,
                createdBy: user.primaryEmailAddress.emailAddress,
                createdAt: moment().format("DD/MM/YYYY"),
            });

            console.log("DB Insert Result:", result); // ✅ Log the DB response
        } catch (error) {
            console.error("Error inserting into DB:", error);
        }
    };

    return (
        <div className="p-10 bg-slate-100 min-h-screen">
            <Link href="/dashboard">
                <Button className="flex gap-2 mb-4">
                    <ArrowLeft className="w-4 h-4" /> Back
                </Button>
            </Link>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 py-5">
                <FormSection
                    selectedTemplate={selectedTemplate}
                    userFormInput={(v: any) => GenrateAIContent(v)}
                    loading={loading}
                />
                <div className="col-span-2">
                    <OutputSection aiOutput={aiOutput} />
                </div>
            </div>
        </div>
    );
};

export default CreateNewContent;
