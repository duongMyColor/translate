import * as React from "react";

function TranslationCard({ language, text, translation, isActive }) {
  return (
    <div className="flex flex-col justify-center p-px bg-black bg-opacity-0">
      <div className="flex flex-col px-2 pt-2 pb-4 w-full rounded-md bg-slate-100">
        <div className="flex gap-5 justify-between w-full max-md:mr-1.5">
          <div className="flex flex-col justify-center px-0.5 py-px text-xs font-semibold bg-black bg-opacity-0 text-slate-400">
            <div
              className={`px-2 py-2.5 rounded-lg border ${
                isActive ? "bg-blue-200 border-blue-100" : "bg-blue-100"
              } border-solid`}
            >
              {language}
            </div>
          </div>
          <div className="flex gap-3 my-auto">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/9599e4f6358683e2d05b974b1cac747e140dae4d78a164e817e5099af364965b?placeholderIfAbsent=true&apiKey=0e62cc3195574aa89ba498a373db4c8f"
              className="object-contain shrink-0 w-2.5 aspect-square"
              alt=""
            />
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/95c8a8c9de07cde734ff567a216a317ed5408e4f9053bff29ae9a7f049018429?placeholderIfAbsent=true&apiKey=0e62cc3195574aa89ba498a373db4c8f"
              className="object-contain shrink-0 self-start w-0.5 aspect-[0.25]"
              alt=""
            />
          </div>
        </div>
        <div className="mt-3 text-xs font-semibold text-slate-400">{text}</div>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/1ab7037dcd637ab2c3138401aefe15e5a4d0b40b83d892becd48e3efb95fab5c?placeholderIfAbsent=true&apiKey=0e62cc3195574aa89ba498a373db4c8f"
          className="object-contain mt-1.5 w-full aspect-[58.82]"
          alt=""
        />
        <div className="mt-2 text-xs font-semibold text-neutral-300">
          {translation}
        </div>
      </div>
    </div>
  );
}

export default TranslationCard;
