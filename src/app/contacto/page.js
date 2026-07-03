import ContactForm from "@/components/ContactForm";

export default function ContactoPage() {
  return (
    <main className="max-w-2xl mx-auto px-6 py-12">
      <h1 className="text-4xl uppercase tracking-widest text-neutral-900 mb-8 text-center font-normal">
        Contacto
      </h1>
      <ContactForm />
    </main>
  );
}