"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";
import { deleteEnquiry } from "@/app/admin/actions";

function ConfirmationButtons({ onCancel }: { onCancel: () => void }) {
  const { pending } = useFormStatus();
  return (
    <div className="flex flex-wrap gap-3">
      <button type="submit" disabled={pending} className="min-h-11 rounded-full bg-red-700 px-5 py-3 text-sm font-bold text-white hover:bg-red-800 disabled:opacity-60">
        {pending ? "Deleting…" : "Yes, delete enquiry"}
      </button>
      <button type="button" disabled={pending} onClick={onCancel} className="min-h-11 rounded-full border border-[#d7e3d9] px-5 py-3 text-sm font-bold disabled:opacity-60">
        Cancel
      </button>
    </div>
  );
}

export default function DeleteEnquiry({ id, name, returnPage }: { id: string; name: string; returnPage: number }) {
  const [confirming, setConfirming] = useState(false);
  if (!confirming) {
    return (
      <button type="button" onClick={() => setConfirming(true)} aria-expanded={false} className="min-h-11 w-fit rounded-full border border-red-700 px-5 py-3 text-sm font-bold text-red-800 hover:bg-red-50">
        Delete enquiry
      </button>
    );
  }
  return (
    <form action={deleteEnquiry} className="grid gap-4 rounded-xl border border-red-200 bg-red-50 p-4">
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="returnPage" value={returnPage} />
      <input type="hidden" name="confirmation" value="delete" />
      <p role="status" className="[overflow-wrap:anywhere] text-sm leading-6 text-red-950">
        Permanently delete the enquiry from <strong>{name}</strong>? This cannot be undone.
      </p>
      <ConfirmationButtons onCancel={() => setConfirming(false)} />
    </form>
  );
}
