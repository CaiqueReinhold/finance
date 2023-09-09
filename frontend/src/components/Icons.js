export function Add(height = 24, width = 24, color = '#000000') {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={height.toString()}
      viewBox="0 96 960 960"
      width={width.toString()}
    >
      <path
        fill={color}
        d="M450 856V606H200v-60h250V296h60v250h250v60H510v250h-60Z"
      />
    </svg>
  );
}

export function Delete(height = 24, width = 24, color = '#000000') {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={height.toString()}
      viewBox="0 96 960 960"
      width={width.toString()}
    >
      <path
        fill={color}
        d="M261 936q-24.75 0-42.375-17.625T201 876V306h-41v-60h188v-30h264v30h188v60h-41v570q0 24-18 42t-42 18H261Zm438-630H261v570h438V306ZM367 790h60V391h-60v399Zm166 0h60V391h-60v399ZM261 306v570-570Z"
      />
    </svg>
  );
}

export function Edit(height = 24, width = 24, color = '#000000') {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 96 960 960"
      height={height.toString()}
      width={width.toString()}
    >
      <path
        fill={color}
        d="M180 876h44l443-443-44-44-443 443v44Zm614-486L666 262l42-42q17-17 42-17t42 17l44 44q17 17 17 42t-17 42l-42 42Zm-42 42L248 936H120V808l504-504 128 128Zm-107-21-22-22 44 44-22-22Z"
      />
    </svg>
  );
}

export function Info(height = 24, width = 24, color = '#000000') {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 96 960 960"
      height={height.toString()}
      width={width.toString()}
    >
      <path
        fill={color}
        d="M453 776h60V536h-60v240Zm26.982-314q14.018 0 23.518-9.2T513 430q0-14.45-9.482-24.225-9.483-9.775-23.5-9.775-14.018 0-23.518 9.775T447 430q0 13.6 9.482 22.8 9.483 9.2 23.5 9.2Zm.284 514q-82.734 0-155.5-31.5t-127.266-86q-54.5-54.5-86-127.341Q80 658.319 80 575.5q0-82.819 31.5-155.659Q143 347 197.5 293t127.341-85.5Q397.681 176 480.5 176q82.819 0 155.659 31.5Q709 239 763 293t85.5 127Q880 493 880 575.734q0 82.734-31.5 155.5T763 858.316q-54 54.316-127 86Q563 976 480.266 976Zm.234-60Q622 916 721 816.5t99-241Q820 434 721.188 335 622.375 236 480 236q-141 0-240.5 98.812Q140 433.625 140 576q0 141 99.5 240.5t241 99.5Zm-.5-340Z"
      />
    </svg>
  );
}

export function Alert(height = 24, width = 24, color = '#000000') {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 96 960 960"
      height={height.toString()}
      width={width.toString()}
    >
      <path
        fill={color}
        d="m40 936 440-760 440 760H40Zm104-60h672L480 296 144 876Zm340.175-57q12.825 0 21.325-8.675 8.5-8.676 8.5-21.5 0-12.825-8.675-21.325-8.676-8.5-21.5-8.5-12.825 0-21.325 8.675-8.5 8.676-8.5 21.5 0 12.825 8.675 21.325 8.676 8.5 21.5 8.5ZM454 708h60V484h-60v224Zm26-122Z"
      />
    </svg>
  );
}

export function Success(height = 24, width = 24, color = '#000000') {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 96 960 960"
      height={height.toString()}
      width={width.toString()}
    >
      <path
        fill={color}
        d="M480 976q-85 0-158-30.5T195 861q-54-54-84.5-127T80 576q0-84 30.5-157T195 292q54-54 127-85t158-31q75 0 140 24t117 66l-43 43q-44-35-98-54t-116-19q-145 0-242.5 97.5T140 576q0 145 97.5 242.5T480 916q145 0 242.5-97.5T820 576q0-30-4.5-58.5T802 462l46-46q16 37 24 77t8 83q0 85-31 158t-85 127q-54 54-127 84.5T480 976Zm-59-218L256 592l45-45 120 120 414-414 46 45-460 460Z"
      />
    </svg>
  );
}

export function Import(height = 24, width = 24, color = '#000000') {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 -960 960 960"
      height={height.toString()}
      width={width.toString()}
    >
      <path
        fill={color}
        d="M450-313v-371L330-564l-43-43 193-193 193 193-43 43-120-120v371h-60ZM220-160q-24 0-42-18t-18-42v-143h60v143h520v-143h60v143q0 24-18 42t-42 18H220Z"
      />
    </svg>
  );
}

export function TrendUp(height = 24, width = 24, color = '#000000') {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 -960 960 960"
      height={height.toString()}
      width={width.toString()}
    >
      <path
        fill={color}
        d="m123-240-43-43 292-291 167 167 241-241H653v-60h227v227h-59v-123L538-321 371-488 123-240Z"
      />
    </svg>
  );
}

export function TrendDown(height = 24, width = 24, color = '#000000') {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 -960 960 960"
      height={height.toString()}
      width={width.toString()}
    >
      <path
        fill={color}
        d="M653-240v-60h127L539-541 372-374 80-665l43-43 248 248 167-167 283 283v-123h59v227H653Z"
      />
    </svg>
  );
}
