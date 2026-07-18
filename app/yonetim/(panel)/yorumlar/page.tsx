export const dynamic = 'force-dynamic';

import { Check, X, Trash2 } from "lucide-react";
import { getAllComments } from "@/lib/admin-data";
import { setCommentApproval, deleteComment } from "@/lib/actions/admin";
import StarRating from "@/components/site/StarRating";

export default async function AdminYorumlarPage() {
  const comments = await getAllComments();

  return (
    <div>
      <h1 className="font-display text-2xl font-bold uppercase tracking-tight text-metal">Yorumlar</h1>
      <p className="mt-1 text-sm text-metalDim">
        Yayınlanmadan önce yorumları buradan onaylayın.
      </p>

      <div className="mt-8 space-y-4">
        {comments.length === 0 && <p className="text-sm text-metalDim">Henüz yorum yok.</p>}
        {comments.map((c) => {
          const approve = setCommentApproval.bind(null, c.id, true);
          const reject = setCommentApproval.bind(null, c.id, false);
          const remove = deleteComment.bind(null, c.id);
          return (
            <div key={c.id} className="spec-card rounded-sm p-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="font-display text-sm font-semibold uppercase tracking-wide text-metal">
                    {c.name}
                  </p>
                  <StarRating rating={c.rating} />
                  <p className="mt-2 max-w-lg text-sm text-metalDim">{c.message}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`rounded-sm px-2.5 py-1 text-xs font-medium ${
                      c.approved ? "bg-spark/20 text-spark" : "bg-steel2 text-metalDim"
                    }`}
                  >
                    {c.approved ? "Yayında" : "Onay bekliyor"}
                  </span>
                  {!c.approved && (
                    <form action={approve}>
                      <button className="flex items-center gap-1 rounded-sm border border-steel2 px-2.5 py-1.5 text-xs text-metal hover:border-spark hover:text-spark">
                        <Check size={13} /> Onayla
                      </button>
                    </form>
                  )}
                  {c.approved && (
                    <form action={reject}>
                      <button className="flex items-center gap-1 rounded-sm border border-steel2 px-2.5 py-1.5 text-xs text-metalDim hover:text-metal">
                        <X size={13} /> Kaldır
                      </button>
                    </form>
                  )}
                  <form action={remove}>
                    <button className="flex items-center gap-1 text-xs text-metalDim hover:text-spark">
                      <Trash2 size={13} />
                    </button>
                  </form>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
