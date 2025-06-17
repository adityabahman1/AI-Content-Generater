// app/dashboard/history/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import { db } from "@/utils/db";
import { AIOutput } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { useUser } from "@clerk/nextjs";
import { Copy, Loader2 } from "lucide-react";
import Templates from "@/app/(data)/Templates";
import { TEMPLATE } from "@/app/_components/TemplateList";
import { Button } from "@/components/ui/button";

export interface UserGeneratedContent {
  id: number;
  formData: any;
  templateSlug: string;
  aiResponse: string;
  createdBy: string;
  createdAt: string;
}

const HistoryPage = () => {
  const { user } = useUser();
  const [data, setData] = useState<UserGeneratedContent[]>([]);
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await db
          .select()
          .from(AIOutput)
          .where(eq(AIOutput.createdBy, user?.primaryEmailAddress?.emailAddress || ""));
        setData(result as UserGeneratedContent[]);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchData();
  }, [user]);

  const handleCopy = async (text: string, id: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 1500);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="p-10 min-h-screen bg-white">
      <h1 className="text-3xl font-bold mb-6">History</h1>
      <h1 className="text-xl font-bold mb-6">Your AI Generated History</h1>

      {loading ? (
        <div className="flex justify-center items-center">
          <Loader2 className="animate-spin w-6 h-6" />
        </div>
      ) : data.length === 0 ? (
        <p>No content found for this user.</p>
      ) : (
        <div className="overflow-auto">
          <table>
            <thead className="min-w-full border border-gray-300">
              <tr className="bg-gray-100">
                <th className="px-4 py-2 border">Template</th>
                <th className="px-4 py-2 border">AI Response</th>
                <th className="px-4 py-2 border">Created At</th>
                <th className="px-4 py-2 border">Word Count</th>
                <th className="px-4 py-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => {
                const template: TEMPLATE | undefined = Templates.find(
                  (t) => t.slug === item.templateSlug
                );
                const wordCount = item.aiResponse.split(/\s+/).length;
                const preview = item.aiResponse.split(" ").slice(0, 30).join(" ") + (wordCount > 30 ? "..." : "");

                return (
                  <tr key={item.id} className="border-b-3">
                    <td className="px-5 py-4 flex items-center justify-center my-5 gap-2">
                      {template?.icon && typeof template.icon === 'string' ? (
                        <img src={template.icon} alt="icon" className="w-5 h-5" />
                      ) : (
                        template?.icon && <template.icon className="w-5 h-5" />
                      )}
                      {template?.title || item.templateSlug}
                    </td>
                    <td className="px-4 py-2 text-sm whitespace-pre-wrap max-w-md">
                      {preview}
                    </td>
                    <td className="px-4 py-2">{item.createdAt}</td>
                    <td className="px-4 py-2 text-center">{wordCount}</td>
                    <td className="px-4 py-2 text-center">
                      <Button
                        onClick={() => handleCopy(item.aiResponse, item.id)}
                        className="flex gap-2 text-sm"
                      >
                        <Copy className="w-4 h-4" />
                        {copiedId === item.id ? "Copied!" : "Copy"}
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default HistoryPage;
