// app/en/people/page.tsx
import PeopleDirectory from "@/components/people/PeopleDirectory";

// We read office & q from the URL, with office defaulting to "United Kingdom"
export default function Page({
  searchParams,
}: {
  searchParams: {
    office?: string;
    q?: string;
    sector?: string;
    service?: string;
    letter?: string;
    page?: string;
  };
}) {
  const office = decodeURIComponent(searchParams.office ?? "United Kingdom");
  const q = searchParams.q ?? "";
  const sector = searchParams.sector ?? "";
  const service = searchParams.service ?? "";
  const letter = (searchParams.letter ?? "").toUpperCase();
  const page = Number(searchParams.page ?? "1");

  return (
    <main className="min-h-screen bg-white">
      <div className="container-page py-8">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
          People
        </h1>
        <p className="mt-2 text-slate-600">
          Search and filter our lawyers and professionals across offices,
          sectors and capabilities.
        </p>
      </div>

      <PeopleDirectory
        office={office}
        q={q}
        sector={sector}
        service={service}
        letter={letter}
        page={page}
      />
    </main>
  );
}
