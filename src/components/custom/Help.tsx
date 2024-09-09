import formImage from "Image/images/form.png";
import ratingImage from "Image/images/rating.png";
import bellIcon from "Image/images/bell.png";
import Image from "next/image";
import HeaderText from "@/components/custom/Header.text";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

function Help() {
  return (
    <>
      <HeaderText title="Tentang Aplikasi?" />
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-2">
          <AccordionTrigger>
            <div className="flex items-end gap-2 text-left">
              <Image src={formImage} alt="Bot" className="w-10" />
              Mengajukan Pertemuan Dengan Pihak Terkait
            </div>
          </AccordionTrigger>
          <AccordionContent>
            Anda bisa mengajukan tanggal anda bertamu atau mengajukan pertemuan
            dengan mengisi form yang telah disediakan
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>
            <div className="flex items-end gap-2">
              <Image src={ratingImage} alt="Bot" className="w-10" />
              Melihat Status Pengajuan
            </div>
          </AccordionTrigger>
          <AccordionContent>
            Anda bisa melihat dan memantau status pengajuan yang telah anda
            berikan pada table.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger>
            <div className="flex items-end gap-2">
              <Image src={bellIcon} alt="Bot" className="w-10" />
              Notifikasi Email
            </div>
          </AccordionTrigger>
          <AccordionContent>
            Anda akan mendapatkan pesan email jika pengajuan anda disetujui
            ataupun ditolak.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
}

export default Help;
