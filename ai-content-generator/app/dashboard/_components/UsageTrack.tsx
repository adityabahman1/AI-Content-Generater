"use client";

import React, { useContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { db } from "@/utils/db";
import { AIOutput } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { useUser } from "@clerk/nextjs";
import { UserGeneratedContent } from "../history/page";
import { TotalUsageContext } from "@/app/(context)/TotalUsageContext";

const MAX_CREDITS = 10000;

const UsageTrack = () => {
  const { user } = useUser();
  const [usedCredits, setUsedCredits] = useContext(TotalUsageContext);

  useEffect(() => {
    if (user) GetData();
  }, [user]);

  const GetData = async () => {
    try {
      const result: UserGeneratedContent[] = await db
        .select()
        .from(AIOutput)
        .where(eq(AIOutput.createdBy, user?.primaryEmailAddress?.emailAddress || ""));
      GetTotalUsage(result);
    } catch (err) {
      console.error("Error fetching usage data:", err);
    }
  };

  const GetTotalUsage = (result: UserGeneratedContent[]) => {
    let total = 0;
    result.forEach((item) => {
      total += item.aiResponse?.split(/\s+/).length || 0; // count words
    });
    setUsedCredits(total);
    console.log(total); 
  };

  const usagePercent = Math.min((usedCredits / MAX_CREDITS) * 100, 100).toFixed(2);

  return (
    <div className="m-5">
      <div className="bg-primary text-white rounded-lg p-4">
        <h2 className="font-semibold">Credits</h2>
        <div className="bg-[#9981f9] h-2 w-full rounded-full my-2">
          <div
            className="bg-white h-2 rounded-full"
            style={{ width: `${usagePercent}%` }}
          ></div>
        </div>
        <h2 className="text-sm my-2">
          {usedCredits}/{MAX_CREDITS} credits used
        </h2>
      </div>
      <Button variant="outline" className="bg-primary w-full my-3 text-white">
        Upgrade
      </Button>
    </div>
  );
};

export default UsageTrack;
