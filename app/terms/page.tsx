import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FloatingButtons } from "@/components/FloatingButtons";

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen py-20">
        <div className="mx-auto max-w-3xl px-6">
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-neon">
            TERMS
          </p>
          <h1 className="mt-3 text-4xl font-extrabold sm:text-5xl">
            Syarat & Ketentuan
          </h1>
          <div className="mt-8 space-y-6 text-sm leading-relaxed text-muted">
            <p>
              Dengan melakukan pembelian di CYBER FLUX STORE, kamu dianggap telah membaca
              dan menyetujui seluruh syarat dan ketentuan yang berlaku.
            </p>
            <p>
              Semua produk bersifat digital dan tidak dapat dikembalikan setelah
              dikirim. Garansi berlaku sesuai ketentuan masing-masing produk.
            </p>
            <p>
              Segala bentuk penyalahgunaan akan ditindak tegas sesuai hukum yang
              berlaku.
            </p>
          </div>
        </div>
      </main>
      <Footer />
      <FloatingButtons />
    </>
  );
}