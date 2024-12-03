import * as React from "react";
import TranslationCard from "./TranslationCard";

const translations = [
  {
    language: "English > French",
    text: "Our live chat is open 9am-8pm on weekdays, and 10am-5pm on weekends.",
    translation:
      "Notre chat en direct est ouvert de 9h a 20h en semaine et de 10h a 17h le week-end",
    isActive: true,
  },
  {
    language: "English > Georgian",
    text: "The culture and people were very interesting",
    translation: "33mo36a (o bagnbo dognna6 ban6agrigoms",
    isActive: false,
  },
  {
    language: "English > French",
    text: "Where is the train station?",
    translation: "Où est la gare?",
    isActive: true,
  },
  {
    language: "English > Georgian",
    text: "Take control of your payments. Say goodbye to credit card fees and say hello to instant settlements.",
    translation:
      "onmgmond3g6n.gamabmgonbgm6ofmgmn. @ag88gncmogmbagfgmngmoafamnb.bagmnom qs Ongbamdgon dynbngfa6gamndb6mgogols.",
    isActive: true,
  },
  {
    language: "English > Ukrainian",
    text: "There is a possibility of rain in the evening, please take the umbrella with you",
    translation: "Увечерi можливий дощ. вiзышiть iз собою парасольку",
    isActive: true,
  },
];

function TranslationHistory() {
  return (
    <div className="flex overflow-hidden flex-col bg-black bg-opacity-0 max-w-[815px]">
      <div className="flex flex-col py-0.5 w-full bg-white max-md:max-w-full">
        <div className="z-10 w-full max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col">
            <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/3b4f92a5ba64c23b28000c9fc5936303d5f74255d40786f5d3916ad318833a1e?placeholderIfAbsent=true&apiKey=0e62cc3195574aa89ba498a373db4c8f"
                className="object-contain grow w-full aspect-[1.33]"
                alt="Translation interface main image"
              />
            </div>
            <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
              <div className="flex flex-col mt-1 w-full bg-black bg-opacity-0">
                <div className="flex flex-col pb-6 w-full bg-slate-100">
                  {/* Language Selection Header */}
                  <div className="flex z-10 flex-wrap gap-px self-start px-px font-semibold bg-black bg-opacity-0">
                    <div className="flex flex-auto gap-6 py-3.5 pr-20 pl-3.5 bg-black bg-opacity-0 max-md:pr-5">
                      <div className="flex gap-2.5">
                        <div className="flex flex-col justify-center p-1 text-xs bg-black bg-opacity-0 text-slate-400">
                          <div className="px-2.5 py-3 bg-blue-200 rounded-lg border border-sky-100 border-solid">
                            Detect language
                          </div>
                        </div>
                        <div className="my-auto text-xs text-neutral-300">
                          English
                        </div>
                      </div>
                      <div className="flex gap-7 my-auto text-xs whitespace-nowrap text-neutral-300">
                        <div>Ukrainian</div>
                        <img
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/a6ee3355e642248696634b2c23ce8a99782ee9ccfb4c0b3ccbc78ee0aa350e27?placeholderIfAbsent=true&apiKey=0e62cc3195574aa89ba498a373db4c8f"
                          className="object-contain shrink-0 self-start w-2 aspect-[1.6]"
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                  {/* Rest of the content remains unchanged */}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col pt-3 pr-7 pl-2 w-full bg-white max-md:pr-5 max-md:max-w-full">
          <div className="mt-2 max-md:mr-0.5 max-md:max-w-full">
            <div className="flex gap-5 max-md:flex-col">
              {[0, 1, 2, 3, 4].map((index) => (
                <div
                  key={index}
                  className="flex flex-col w-[33%] max-md:ml-0 max-md:w-full"
                >
                  <TranslationCard {...translations[index]} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TranslationHistory;
