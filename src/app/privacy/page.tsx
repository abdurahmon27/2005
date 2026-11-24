import type { Metadata } from "next";
import { EMAIL, Ext, Lang, LegalPage, Local, Section } from "@/components/legal/legal";

export const metadata: Metadata = {
  title: "Privacy Policy | Haywan",
  description:
    "Privacy policy for the YouTube Uploader tool used by haywan.uz to upload videos to its own YouTube channel through the YouTube API Services.",
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" updated="Last updated: 2026-11-25 · English · Oʻzbekcha pastda">
      <p className="mb-2 text-[0.92rem] leading-relaxed text-[#d5c4a1]">
        This policy covers <strong>YouTube Uploader</strong>, a small personal tool run by
        Abdurahmon (&ldquo;Bekzotovich&rdquo;, the owner of{" "}
        <Local href="/">haywan.uz</Local>). The tool uploads the owner&rsquo;s own videos to the
        owner&rsquo;s own YouTube channel through the YouTube Data API. It is not a public
        service: nobody other than the owner signs in to it.{" "}
        <a href="#uz" className="text-[#83a598] underline decoration-dotted underline-offset-[3px]">
          Oʻzbekcha tarjima pastda.
        </a>
      </p>

      <Section title="1. What data the tool accesses">
        <p>
          When the owner signs in with Google, the tool asks for permission to use the owner&rsquo;s
          YouTube account through the YouTube Data API. It can access only what is needed to upload
          and manage the owner&rsquo;s own videos:
        </p>
        <ul className="list-disc space-y-1 pl-5">
          <li>basic details of the owner&rsquo;s own YouTube channel (its ID and title);</li>
          <li>
            the owner&rsquo;s own videos and playlists: creating an upload, setting its title,
            description, tags, thumbnail and visibility, and adding videos to playlists.
          </li>
        </ul>
        <p>
          The tool does not read other people&rsquo;s private data, does not access the owner&rsquo;s
          Gmail, Drive, contacts or any other Google service, and does not collect data about
          viewers or other YouTube users.
        </p>
      </Section>

      <Section title="2. How the data is used">
        <p>
          Google user data is used for one purpose only: to upload and update the owner&rsquo;s own
          videos and playlists on the owner&rsquo;s own channel. It is not used for advertising,
          profiling, analytics, machine-learning training, or any other purpose.
        </p>
      </Section>

      <Section title="3. Storage and security">
        <ul className="list-disc space-y-1 pl-5">
          <li>
            The OAuth token that Google issues is stored as a file on the owner&rsquo;s own
            computer. It is not uploaded to haywan.uz or to any server or database operated by the
            owner or by third parties.
          </li>
          <li>
            The token file is protected by the owner&rsquo;s own computer account and file
            permissions. We do not claim that it is separately encrypted.
          </li>
          <li>
            The website haywan.uz does not receive, process or store any YouTube or Google user
            data, and it has no sign-in for visitors.
          </li>
        </ul>
      </Section>

      <Section title="4. Sharing">
        <p>
          Google user data is <strong>not sold, rented, transferred or shared</strong> with anyone.
          The only party the tool talks to is Google/YouTube itself, to carry out the upload the
          owner asked for. The use of information received from Google APIs adheres to the{" "}
          <Ext href="https://developers.google.com/terms/api-services-user-data-policy">
            Google API Services User Data Policy
          </Ext>
          , including its Limited Use requirements.
        </p>
      </Section>

      <Section title="5. Retention and deletion">
        <p>
          The token is kept on the owner&rsquo;s computer only while the tool is in use. The owner can
          revoke the tool&rsquo;s access at any time at{" "}
          <Ext href="https://myaccount.google.com/permissions">
            myaccount.google.com/permissions
          </Ext>{" "}
          and delete the local token file; after that the tool can no longer access the YouTube
          account. Videos already uploaded remain on YouTube and are governed by YouTube&rsquo;s own
          terms; they can be deleted in YouTube Studio.
        </p>
      </Section>

      <Section title="6. YouTube API Services and Google">
        <p>
          This tool uses <strong>YouTube API Services</strong>. By using it, the owner agrees to be
          bound by the{" "}
          <Ext href="https://www.youtube.com/t/terms">YouTube Terms of Service</Ext>. Google&rsquo;s
          handling of data is described in the{" "}
          <Ext href="https://policies.google.com/privacy">Google Privacy Policy</Ext>.
        </p>
      </Section>

      <Section title="7. Changes">
        <p>
          If the tool&rsquo;s behaviour changes, this page will be updated and the date at the top
          changed.
        </p>
      </Section>

      <Section title="8. Contact">
        <p>
          Questions or requests about this policy:{" "}
          <Ext href={`mailto:${EMAIL}`}>{EMAIL}</Ext>. See also the{" "}
          <Local href="/terms">Terms of Service</Local>.
        </p>
      </Section>

      <Lang id="uz">Oʻzbekcha tarjima</Lang>
      <p className="mb-2 font-mono text-[0.75rem] text-[#7c6f64]">
        Oxirgi yangilanish: 2026-11-25. Ingliz tilidagi matn asosiy hisoblanadi.
      </p>

      <h2 className="mb-3 mt-6 text-[1.4rem] text-[#fe8019]">Maxfiylik siyosati</h2>
      <p className="mb-2 text-[0.92rem] leading-relaxed text-[#d5c4a1]">
        Bu siyosat <strong>YouTube Uploader</strong> uchun: Abdurahmon (&ldquo;Bekzotovich&rdquo;,{" "}
        <Local href="/">haywan.uz</Local> egasi) ishlatadigan kichik shaxsiy vosita. U egasining oʻz
        videolarini oʻz YouTube kanaliga YouTube Data API orqali yuklaydi. Bu ommaviy xizmat emas:
        unga egasidan boshqa hech kim kirmaydi.
      </p>

      <Section title="1. Vosita qanday maʼlumotga kiradi">
        <p>
          Egasi Google orqali kirganda vosita YouTube hisobidan foydalanishga ruxsat soʻraydi. U
          faqat egasining oʻz videolarini yuklash va boshqarish uchun kerakli narsaga kira oladi:
        </p>
        <ul className="list-disc space-y-1 pl-5">
          <li>egasining oʻz YouTube kanali haqida asosiy maʼlumot (ID va nomi);</li>
          <li>
            egasining oʻz videolari va playlist&rsquo;lari: yuklash, sarlavha, tavsif, teg,
            muqova (thumbnail) va koʻrinish sozlamalarini belgilash, videoni playlist&rsquo;ga
            qoʻshish.
          </li>
        </ul>
        <p>
          Vosita boshqalarning shaxsiy maʼlumotlarini oʻqimaydi, egasining Gmail, Drive,
          kontaktlari yoki boshqa Google xizmatlariga kirmaydi, tomoshabinlar va boshqa YouTube
          foydalanuvchilari haqida maʼlumot yigʻmaydi.
        </p>
      </Section>

      <Section title="2. Maʼlumot nima uchun ishlatiladi">
        <p>
          Google foydalanuvchi maʼlumoti faqat bitta maqsadda ishlatiladi: egasining oʻz kanalidagi
          oʻz videolari va playlist&rsquo;larini yuklash va yangilash. Reklama, profil tuzish,
          analitika, mashinaviy oʻqitish yoki boshqa maqsadlarda ishlatilmaydi.
        </p>
      </Section>

      <Section title="3. Saqlash va xavfsizlik">
        <ul className="list-disc space-y-1 pl-5">
          <li>
            Google bergan OAuth token egasining oʻz kompyuterida fayl sifatida saqlanadi. U
            haywan.uz'ga, egasi yoki uchinchi tomon boshqaradigan boshqa serverga yoki bazaga
            yuklanmaydi.
          </li>
          <li>
            Token faylini egasining kompyuter akkaunti va fayl ruxsatlari himoya qiladi. Alohida
            shifrlangan, deb daʼvo qilmaymiz.
          </li>
          <li>
            haywan.uz sayti hech qanday YouTube yoki Google foydalanuvchi maʼlumotini qabul
            qilmaydi, qayta ishlamaydi va saqlamaydi; tashrif buyuruvchilar uchun kirish yoʻq.
          </li>
        </ul>
      </Section>

      <Section title="4. Ulashish">
        <p>
          Google foydalanuvchi maʼlumoti <strong>sotilmaydi, ijaraga berilmaydi, uzatilmaydi va
          hech kim bilan ulashilmaydi</strong>. Vosita faqat Google/YouTube'ning oʻzi bilan
          gaplashadi, egasi soʻragan yuklashni bajarish uchun. Google API'laridan olingan
          maʼlumotdan foydalanish{" "}
          <Ext href="https://developers.google.com/terms/api-services-user-data-policy">
            Google API Services User Data Policy
          </Ext>{" "}
          (shu jumladan Limited Use talablari) ga amal qiladi.
        </p>
      </Section>

      <Section title="5. Saqlash muddati va oʻchirish">
        <p>
          Token egasining kompyuterida faqat vosita ishlatilayotgan davrda turadi. Egasi istalgan
          vaqtda{" "}
          <Ext href="https://myaccount.google.com/permissions">myaccount.google.com/permissions</Ext>{" "}
          sahifasida vositaning ruxsatini bekor qila oladi va mahalliy token faylini oʻchiradi:
          shundan keyin vosita YouTube hisobiga kira olmaydi. Allaqachon yuklangan videolar
          YouTube'da qoladi va YouTube shartlariga boʻysunadi; ularni YouTube Studio'da oʻchirish
          mumkin.
        </p>
      </Section>

      <Section title="6. YouTube API Services va Google">
        <p>
          Bu vosita <strong>YouTube API Services</strong>&rsquo;dan foydalanadi. Undan foydalanish
          bilan egasi{" "}
          <Ext href="https://www.youtube.com/t/terms">YouTube Terms of Service</Ext>&rsquo;ga
          rozilik bildiradi. Google maʼlumotlar bilan qanday ishlashi{" "}
          <Ext href="https://policies.google.com/privacy">Google Privacy Policy</Ext>&rsquo;da
          yozilgan.
        </p>
      </Section>

      <Section title="7. Oʻzgarishlar">
        <p>
          Vosita ishlashi oʻzgarsa, shu sahifa yangilanadi va yuqoridagi sana almashtiriladi.
        </p>
      </Section>

      <Section title="8. Aloqa">
        <p>
          Shu siyosat boʻyicha savol yoki soʻrov: <Ext href={`mailto:${EMAIL}`}>{EMAIL}</Ext>.
          Shuningdek: <Local href="/terms">Foydalanish shartlari</Local>.
        </p>
      </Section>
    </LegalPage>
  );
}
