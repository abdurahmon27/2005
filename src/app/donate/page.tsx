"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";

export default function DonatePage() {
  const [copied, setCopied] = useState(false);
  const [visaCopied, setVisaCopied] = useState(false);

  const tonAddress = "UQDPo_oije20mUuEBx4r4rH1KNAzFAROL9c60yQRQ6rGfC8m";
  const visaCard = {
    number: "4278 3200 2518 8383",
    name: "Raxmon Mamadiyorov",
  };

  async function copyToClipboard(text: string, type: "ton" | "visa") {
    if (type === "ton") {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } else if (type === "visa") {
      await navigator.clipboard.writeText(text);
      setVisaCopied(true);
      setTimeout(() => setVisaCopied(false), 2000);
    }
  }

  return (
    <main className="max-w-5xl mx-auto py-10 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Donate</h1>
        <p className="text-muted mt-2">
          Support my work — every contribution helps.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Tirikchilik.uz</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-foreground">
              Use the Tirikchilik payment link to donate with cards or mobile
              wallets. This opens their secure checkout.
            </p>
            <div className="flex items-center gap-4">
              <Button asChild variant="default">
                <Link
                  href="https://tirikchilik.uz/haywan"
                  target="_blank"
                  rel="noreferrer"
                >
                  Open Tirikchilik.uz
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Other options</CardTitle>
            <CardDescription>
              Credit cards, mobile wallets and TON
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 rounded-md border">
                <div className="flex items-start gap-4">
                  <div className="flex-1">
                    <div className="font-medium">VISA</div>
                    <div className="text-sm text-muted">
                      Send VISA or MasterCard payments to the card below
                    </div>

                    <div className="mt-3 flex items-center gap-3">
                      <div className="px-3 py-2 bg-secondary rounded-md font-mono text-sm select-all">
                        {visaCard.number} * {visaCard.name}
                      </div>
                      <Button
                        variant="outline"
                        onClick={() => copyToClipboard(visaCard.number, "visa")}
                      >
                        {visaCopied ? "Copied" : "Copy"}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-3 rounded-md border">
                <div className="flex items-start gap-4">
                  <div className="flex-1">
                    <div className="font-medium">TON Wallet</div>
                    <div className="text-sm text-muted">
                      Send TON directly to the wallet below
                    </div>

                    <div className="mt-3 flex items-center justify-between gap-3">
                      <div className="px-3 py-2 bg-secondary rounded-md font-mono text-sm select-all">
                        {tonAddress.slice(0, 10) + "..." + tonAddress.slice(-4)}
                      </div>
                      <Button
                        variant="outline"
                        onClick={() => copyToClipboard(tonAddress, "ton")}
                      >
                        {copied ? "Copied" : "Copy"}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 text-sm text-muted">
        <p>
          Questions? Reach out via{" "}
          <Link href="/about" className="text-accent">
            about
          </Link>{" "}
          page or contact on Telegram.
        </p>
      </div>
    </main>
  );
}
