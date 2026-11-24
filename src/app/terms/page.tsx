import type { Metadata } from "next";
import { EMAIL, Ext, Lang, LegalPage, Local, Section } from "@/components/legal/legal";

export const metadata: Metadata = {
  title: "Terms of Service | Haywan",
  description:
    "Terms of service for the YouTube Uploader tool used by haywan.uz to upload videos to its own YouTube channel through the YouTube API Services.",
};

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Service" updated="Last updated: 2026-11-25 · English · Oʻzbekcha pastda">
      <p className="mb-2 text-[0.92rem] leading-relaxed text-[#d5c4a1]">
        These terms cover <strong>YouTube Uploader</strong>, a small personal tool run by
        Abdurahmon (&ldquo;Bekzotovich&rdquo;, the owner of <Local href="/">haywan.uz</Local>) to
        upload the owner&rsquo;s own videos to the owner&rsquo;s own YouTube channel.{" "}
        <a href="#uz" className="text-[#83a598] underline decoration-dotted underline-offset-[3px]">
          Oʻzbekcha tarjima pastda.
        </a>
      </p>

      <Section title="1. What the tool is">
        <p>
          YouTube Uploader is a private tool for the owner. It is not offered to the public, there
          are no user accounts, and nobody else is expected to sign in. It uses{" "}
          <strong>YouTube API Services</strong> to upload and update videos and playlists on the
          owner&rsquo;s own channel.
        </p>
      </Section>

      <Section title="2. YouTube Terms of Service">
        <p>
          By using the tool, you agree to be bound by the{" "}
          <Ext href="https://www.youtube.com/t/terms">YouTube Terms of Service</Ext>. Google&rsquo;s
          data practices are described in the{" "}
          <Ext href="https://policies.google.com/privacy">Google Privacy Policy</Ext>. Content
          uploaded through the tool must follow YouTube&rsquo;s rules and the law.
        </p>
      </Section>

      <Section title="3. Your data">
        <p>
          How the tool handles Google and YouTube data is set out in the{" "}
          <Local href="/privacy">Privacy Policy</Local>. In short: it is used only to upload and
          manage the owner&rsquo;s own videos, kept on the owner&rsquo;s own computer, and never sold
          or shared. Access can be revoked at any time at{" "}
          <Ext href="https://myaccount.google.com/permissions">myaccount.google.com/permissions</Ext>.
        </p>
      </Section>

      <Section title="4. No warranty">
        <p>
          The tool is provided &ldquo;as is&rdquo;, without warranties of any kind. Uploads depend
          on YouTube and its API, which can change, limit or refuse requests (for example, quota
          limits or audit-related restrictions on API uploads). To the extent the law allows, the
          owner is not liable for losses caused by using or being unable to use the tool.
        </p>
      </Section>

      <Section title="5. Changes and ending">
        <p>
          These terms may be updated; the date above will change when they are. The owner may stop
          running the tool at any time.
        </p>
      </Section>

      <Section title="6. Contact">
        <p>
          <Ext href={`mailto:${EMAIL}`}>{EMAIL}</Ext>
        </p>
      </Section>

      <Lang id="uz">Oʻzbekcha tarjima</Lang>
      <p className="mb-2 font-mono text-[0.75rem] text-[#7c6f64]">
        Oxirgi yangilanish: 2026-11-25. Ingliz tilidagi matn asosiy hisoblanadi.
      </p>

      <h2 className="mb-3 mt-6 text-[1.4rem] text-[#fe8019]">Foydalanish shartlari</h2>
      <p className="mb-2 text-[0.92rem] leading-relaxed text-[#d5c4a1]">
        Bu shartlar <strong>YouTube Uploader</strong> uchun: Abdurahmon (&ldquo;Bekzotovich&rdquo;,{" "}
        <Local href="/">haywan.uz</Local> egasi) egasining oʻz videolarini oʻz YouTube kanaliga
        yuklash uchun ishlatadigan kichik shaxsiy vosita.
      </p>

      <Section title="1. Vosita nima">
        <p>
          YouTube Uploader egasi uchun yopiq vosita. U ommaga taklif qilinmaydi, foydalanuvchi
          akkauntlari yoʻq, boshqa hech kim kirishi kutilmaydi. U egasining oʻz kanalidagi video
          va playlist&rsquo;larni yuklash va yangilash uchun <strong>YouTube API Services</strong>
          &rsquo;dan foydalanadi.
        </p>
      </Section>

      <Section title="2. YouTube Terms of Service">
        <p>
          Vositadan foydalanish bilan siz{" "}
          <Ext href="https://www.youtube.com/t/terms">YouTube Terms of Service</Ext>&rsquo;ga
          boʻysunishga rozilik bildirasiz. Google maʼlumotlar bilan qanday ishlashi{" "}
          <Ext href="https://policies.google.com/privacy">Google Privacy Policy</Ext>&rsquo;da
          yozilgan. Vosita orqali yuklangan kontent YouTube qoidalari va qonunga mos boʻlishi
          shart.
        </p>
      </Section>

      <Section title="3. Sizning maʼlumotingiz">
        <p>
          Vosita Google va YouTube maʼlumoti bilan qanday ishlashi{" "}
          <Local href="/privacy">Maxfiylik siyosati</Local>&rsquo;da bayon qilingan. Qisqasi: u
          faqat egasining oʻz videolarini yuklash va boshqarish uchun ishlatiladi, egasining oʻz
          kompyuterida saqlanadi, sotilmaydi va ulashilmaydi. Ruxsatni istalgan vaqtda{" "}
          <Ext href="https://myaccount.google.com/permissions">myaccount.google.com/permissions</Ext>{" "}
          sahifasida bekor qilish mumkin.
        </p>
      </Section>

      <Section title="4. Kafolat yoʻq">
        <p>
          Vosita &ldquo;qanday boʻlsa, shunday&rdquo; taqdim etiladi, hech qanday kafolatsiz.
          Yuklash YouTube va uning API&rsquo;siga bogʻliq: ular soʻrovlarni oʻzgartirishi,
          cheklashi yoki rad etishi mumkin (masalan, kvota yoki API audit bilan bogʻliq
          cheklovlar). Qonun ruxsat bergan darajada, egasi vositadan foydalanish yoki
          foydalana olmaslik tufayli yetgan zarar uchun javobgar emas.
        </p>
      </Section>

      <Section title="5. Oʻzgarishlar va tugatish">
        <p>
          Bu shartlar yangilanishi mumkin; shunda yuqoridagi sana almashadi. Egasi vositani istalgan
          vaqtda toʻxtatishi mumkin.
        </p>
      </Section>

      <Section title="6. Aloqa">
        <p>
          <Ext href={`mailto:${EMAIL}`}>{EMAIL}</Ext>
        </p>
      </Section>
    </LegalPage>
  );
}
