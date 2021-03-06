export const playerToken = (player, labelText) => {
  if(player === 2) {
    return `
      <div class="token" role="status" aria-live="polite">
        <svg 
          class="c"
          viewBox="0 0 102 102" 
          fill-rule="evenodd"
          clip-rule="evenodd"
          focusable="false"
        >
          <path d="M50 98C76.5097 98 98 76.5097 98 50C98 23.4903 76.5097 2 50 2C23.4903 2 2 23.4903 2 50C2 76.5097 23.4903 98 50 98ZM50 100C77.6142 100 100 77.6142 100 50C100 22.3858 77.6142 0 50 0C22.3858 0 0 22.3858 0 50C0 77.6142 22.3858 100 50 100Z" />
        </svg>
      </div>
    `;
  }else if(player === 1) {
    return `
      <div class="token" role="status" aria-live="polite" aria-relevant="additions">
      <span class="visually-hidden">Player ${player} played on ${labelText}</span>
      <svg 
        class="c"
        viewBox="0 0 105 105"
        fill-rule="evenodd"
        clip-rule="evenodd"
        focusable="false"
      >
        <path d="M52.2046 52L102 101.593L103.417 100.181L53.6217 50.5887L102 2.4075L100.583 0.996175L52.2046 49.1774L3.41705 0.588684L1.99996 2.00001L50.7875 50.5887L0.582886 100.589L1.99998 102L52.2046 52Z" />
      </svg>
      </div>
    `;
  }
};