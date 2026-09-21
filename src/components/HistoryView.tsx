import { History } from "lucide-react";

export function HistoryView()
{
    return(
        <div className="w-full max-w-sm bg-zinc-900/80 border border-zinc-800 rounded-3xl p-6 shadow-2xl flex flex-col items-center">
            
            {/* İkon Kutusu */}
            <div className="p-3 bg-purple-950/40 border border-purple-800/50 rounded-2xl mb-4">
                <History className="w-8 h-8 text-purple-400" />
            </div>

            <h2 className="text-xl font-bold mb-2 text-purple-400">Antrenman Geçmişi</h2>
            <p className="text-zinc-400 text-xs text-center">
                Geçmiş antrenman kayıtların burada listelenecek.
            </p>

        </div>
    );
}

