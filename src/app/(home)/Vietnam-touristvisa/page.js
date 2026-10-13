"use client";

import AdsVisaLanding from '../../../components/adsVisa/AdsVisaLanding';
import {
  australiaDestinationCard,
  schengenDestinationCard,
  ukDestinationCard,
  vietnamDestinationCard,
} from '../../../components/adsVisa/CountryCardsSection';

const titleWords = [
  'Expert',
  ' Visa',
  ' Consultants',
  ' for',
  ' Vietnam,',
  ' UK,',
  ' Schengen',
  ' &',
  ' Australia',
];

const description =
  "Get visa consultation for tourist and business travel to Vietnam, the UK, Schengen (Europe) and Australia with a simple, step-by-step process and fast WhatsApp support whenever you need clarity. We're an independent consultancy (not a government website), and we don't promise approvals; final decisions are always made by the relevant authorities.";

export default function VietnamTouristVisaPage() {
  return (
    <AdsVisaLanding
      pathname="/Vietnam-touristvisa"
      titleWords={titleWords}
      description={description}
      multiCountryText="Consultation support for UK, Vietnam, Schengen (Europe), and Australia travel cases."
      worldwideText="Visa assistance for 100+ destinations worldwide (including UK, Vietnam, Schengen/Europe, and Australia)."
      countries={[
        vietnamDestinationCard,
        ukDestinationCard,
        schengenDestinationCard,
        australiaDestinationCard,
      ]}
      formSource="Vietnam-touristvisa"
      from="Vietnam-touristvisa"
    />
  );
}
