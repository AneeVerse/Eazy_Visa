"use client";

import AdsVisaLanding from '../../../components/adsVisa/AdsVisaLanding';
import {
  australiaDestinationCard,
  baliDestinationCard,
  schengenDestinationCard,
  ukDestinationCard,
} from '../../../components/adsVisa/CountryCardsSection';

const titleWords = [
  'Expert',
  ' Visa',
  ' Consultants',
  ' for',
  ' Bali (Indonesia),',
  ' UK,',
  ' Schengen',
  ' &',
  ' Australia',
];

const description =
  "Get visa consultation for tourist and business travel to Bali (Indonesia), the UK, Schengen (Europe) and Australia with a simple, step-by-step process and fast WhatsApp support whenever you need clarity. We're an independent consultancy (not a government website), and we don't promise approvals; final decisions are always made by the relevant authorities.";

export default function BaliTouristVisaPage() {
  return (
    <AdsVisaLanding
      pathname="/bali-touristvisa"
      titleWords={titleWords}
      description={description}
      multiCountryText="Consultation support for UK, Indonesia, Schengen (Europe), and Australia travel cases."
      worldwideText="Visa assistance for 100+ destinations worldwide (including UK, Indonesia, Schengen/Europe, and Australia)."
      countries={[
        baliDestinationCard,
        ukDestinationCard,
        schengenDestinationCard,
        australiaDestinationCard,
      ]}
      formSource="bali-touristvisa"
      from="bali-touristvisa"
    />
  );
}
