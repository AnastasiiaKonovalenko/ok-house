import journalHero from "@/assets/projects/on-journal/on-journal-big.png";
import ProjectBoilerplate from "@/components/layout/project-page-boilerplate/ProjectBoilerplate.tsx";
import PageBoilerplate from "@/components/layout/page-boilerplate/PageBoilerplate.tsx";

const text = "At this stage, we are conducting exploratory interviews with cultural institutions — and libraries are among our key potential partners. You are closest to the readers and know their needs and interests better than anyone. We would be very grateful for the opportunity to speak with a representative of your library. The interview is fully exploratory and non-binding — simply a chance to reflect together on possible intersections. We would love to arrange a meeting sometime this week, at a time most convenient for you during regular business hours. The only restriction is Wednesday, April 23, when we are available only until 12:00. If a personal meeting is not possible, we would be happy to schedule an online interview instead. If, however, a conversation format is not convenient for you, we would be truly grateful if you could find a few minutes to share your thoughts in writing by answering the list of questions below. We would also kindly ask whether it might be possible to conduct the interview in Russian, as I am originally from Kyiv and my Lithuanian is not yet strong enough for a fluent professional discussion. For your convenience, I’ve included the interview questions below. You will also find attached a brief presentation of the OnJournal project. Thank you very much for your time and consideration.";

const OnJournal = () => {
  return (
  <PageBoilerplate showCarousel={false}>
    <ProjectBoilerplate
      header="On Journal"
      text={text}
      imgPath={journalHero}
    />
  </PageBoilerplate>
  );
};

export default OnJournal;
