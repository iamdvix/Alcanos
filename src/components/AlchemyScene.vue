<script setup>
defineOptions({ name: 'AlchemyScene' })
</script>
<template>
  <!-- Ilustración vectorial pixelada: laboratorio subterráneo con un aldeano clérigo y un soporte de pociones. -->
  <svg class="alchemy-scene" viewBox="0 0 760 620" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Laboratorio subterráneo de Minecraft, con un aldeano alquimista, pociones y un portal encantado" shape-rendering="crispEdges">
    <defs>
      <pattern id="stone" width="80" height="80" patternUnits="userSpaceOnUse">
        <rect width="80" height="80" fill="#2f303e"/>
        <path d="M0 0h80v40H0z" fill="#383845"/><path d="M0 39h80M39 0v39M11 40v40M0 79h80" stroke="#191a26" stroke-width="5"/>
        <path d="M5 5h30v5H5M44 47h28v5H44" fill="#4a4956"/>
        <rect x="15" y="55" width="6" height="5" fill="#4b4b59"/>
      </pattern>
      <pattern id="floor" width="62" height="42" patternUnits="userSpaceOnUse">
        <rect width="62" height="42" fill="#282630"/><path d="M0 40h62M30 0v40" stroke="#15151d" stroke-width="4"/><path d="M3 3h25v4H3" fill="#393641"/>
      </pattern>
      <pattern id="wood" width="38" height="25" patternUnits="userSpaceOnUse"><rect width="38" height="25" fill="#7c4c30"/><path d="M0 2h38M0 23h38M18 2v20" stroke="#3b2723" stroke-width="3"/><path d="M3 7h14M24 17h10" stroke="#ac7142" stroke-width="3"/></pattern>
      <pattern id="portal" width="30" height="30" patternUnits="userSpaceOnUse"><rect width="30" height="30" fill="#7041a8"/><path d="M0 7h30M9 0v30" stroke="#a35be3" stroke-width="3" opacity=".38"/><path d="M18 19h5v5h-5" fill="#c79cff" opacity=".7"/></pattern>
      <linearGradient id="magic" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stop-color="#9864d6"/><stop offset=".65" stop-color="#573581"/><stop offset="1" stop-color="#25204e"/></linearGradient>
    </defs>
    <path d="M40 70h680v425H40z" fill="url(#stone)"/>
    <!-- Portal enmarcado por roca tallada -->
    <path d="M228 490V184l48-64h213l46 64v306z" fill="#141322"/>
    <path d="M260 473V199l30-43h185l29 43v274z" fill="url(#portal)"/>
    <path d="M270 466V212l28-44h169l28 44v254z" fill="url(#magic)" opacity=".55"/>
    <path d="M220 491V181l48-64h229l46 64v310h-40V194l-25-36H288l-24 36v297z" fill="#4c455e"/>
    <path d="M220 491V181l48-64h229l46 64v310" fill="none" stroke="#171521" stroke-width="12"/>
    <path d="M229 184h31v304h-31M512 184h21v304h-21M263 129h230v24H263" fill="#6c647a"/>
    <g fill="#a377ce" opacity=".9"><path d="M240 212h11v27h-11zM516 287h12v30h-12zM365 132h18v11h-18z"/><path d="M276 390h9v9h-9zM472 257h9v9h-9z"/></g>
    <path d="M0 489h760v131H0z" fill="url(#floor)"/><path d="M0 489h760v18H0z" fill="#534657"/><path d="M0 503h760v7H0z" fill="#17151e"/>
    <!-- Pilares y bloques de cueva -->
    <path d="M0 67h175v38H0M0 105h104v95H0M0 201h64v288H0M604 67h156v60H604M684 127h76v363h-76" fill="url(#stone)" stroke="#181722" stroke-width="8"/>
    <path d="M0 430h115v58H0M635 412h125v78H635" fill="#3a3845" stroke="#181722" stroke-width="8"/>
    <g opacity=".75" fill="#76539c"><path d="M45 245h18v42H45zM63 261h15v27H63zM690 340h19v50h-19zM709 354h17v37h-17z"/></g>
    <!-- Antorcha izquierda -->
    <g class="torch-flame"><path d="M111 176h16v25h-16v16h-18v-30h9v-22h9z" fill="#efab41"/><path d="M112 182h10v24h-10v10h-9v-25h9z" fill="#ffe68a"/><path d="M102 199h11v43h-11z" fill="#6a4630"/><path d="M100 219h17v9h-17z" fill="#94613c"/></g>
    <!-- Antorcha derecha -->
    <g class="torch-flame torch-delay"><path d="M632 179h17v29h-17v13h-17v-29h9v-22h8z" fill="#e79a37"/><path d="M633 184h9v29h-9v6h-9v-28h9z" fill="#ffe494"/><path d="M625 211h12v44h-12z" fill="#6a4630"/><path d="M621 226h18v8h-18z" fill="#ad7240"/></g>
    <!-- Estantería de libros de encantamientos -->
    <g transform="translate(10 309)"><rect width="132" height="152" fill="#422c25" stroke="#1b171a" stroke-width="10"/><rect x="10" y="18" width="108" height="9" fill="#98643d"/><rect x="10" y="74" width="108" height="10" fill="#98643d"/><rect x="10" y="131" width="108" height="10" fill="#98643d"/>
      <path d="M15 31h16v40H15z" fill="#416f66"/><path d="M36 32h16v39H36z" fill="#7a356b"/><path d="M57 30h17v41H57z" fill="#ad8b4d"/><path d="M80 35h15v36H80z" fill="#485b97"/><path d="M101 32h12v39h-12z" fill="#557d42"/>
      <path d="M18 89h15v39H18z" fill="#98533d"/><path d="M40 90h13v38H40z" fill="#477f7c"/><path d="M60 87h18v41H60z" fill="#654c98"/><path d="M85 93h12v35H85z" fill="#8a884e"/><path d="M102 90h12v38h-12z" fill="#9d5475"/>
      <path d="M21 43h4v17h-4M62 39h6v4h-6M40 96h7v4h-7M88 99h4v15h-4" fill="#dbc990"/>
    </g>
    <!-- Mesa de trabajo -->
    <path d="M474 422h264v41H474z" fill="url(#wood)" stroke="#2a1c1b" stroke-width="9"/>
    <path d="M490 461h35v109h-35zM691 461h32v109h-32z" fill="#67412d" stroke="#30221f" stroke-width="7"/>
    <path d="M488 432h240v9H488" fill="#ba8251"/>
    <!-- Soporte de pociones -->
    <g class="brewing-stand">
      <path d="M585 280h25v83h-25z" fill="#6e7772" stroke="#282b32" stroke-width="7"/><path d="M576 260h43v24h-43z" fill="#a5a9a0" stroke="#282b32" stroke-width="7"/>
      <path d="M562 358h75v17h-75zM592 354h12v45h-12zM548 394h101v17H548z" fill="#545656" stroke="#242631" stroke-width="7"/>
      <path d="M568 373h13v19h-13zM595 372h13v19h-13zM621 373h13v19h-13z" fill="#a06b42"/>
      <path d="M548 392h33v31h-33zM584 395h33v28h-33zM620 392h33v31h-33z" fill="#96c4c0" stroke="#272938" stroke-width="6"/>
      <path d="M555 406h20v13h-20z" fill="#60c187"/><path d="M590 408h21v10h-21z" fill="#aa64cd"/><path d="M625 404h22v14h-22z" fill="#c67c6f"/>
      <path d="M551 397h24v4h-24M587 400h23v4h-23M625 396h23v4h-23" fill="#e9f2d1"/>
      <path d="M590 247h17v9h-17z" fill="#ffd472" class="brew-spark"/>
    </g>
    <!-- Cuaderno sobre la mesa -->
    <path d="M675 411h32v10h-32z" fill="#e7d6a6" stroke="#25202b" stroke-width="4"/><path d="M686 413h4v7h-4" fill="#9d7d62"/>
    <!-- Aldeano clérigo, inspirado en sus proporciones cúbicas del juego -->
    <g class="villager">
      <path d="M299 426h151v131H299z" fill="#4b3156" stroke="#201d2c" stroke-width="10"/>
      <path d="M314 434h120v113H314" fill="#6d426d"/><path d="M333 437h81v112h-81z" fill="#7b4a78"/>
      <path d="M355 448h41v94h-41" fill="#b994a4"/><path d="M365 448h22v94h-22" fill="#e4c4ac"/>
      <path d="M296 441h38v78h-38zM417 441h39v78h-39z" fill="#684067" stroke="#241f2b" stroke-width="7"/>
      <path d="M330 515h89v31h-89z" fill="#5c365c"/><path d="M340 534h68v11h-68z" fill="#916187"/>
      <!-- Gorra/sombrero y cabeza -->
      <path d="M319 247h109v147H319z" fill="#b98769" stroke="#2b2229" stroke-width="11"/>
      <path d="M328 255h89v108h-89z" fill="#c99b77"/>
      <path d="M329 281h25v29h-25M396 281h23v29h-23" fill="#a8785d"/>
      <path d="M305 279h22v55h-22zM421 279h22v55h-22z" fill="#b98864" stroke="#2b2229" stroke-width="7"/>
      <path d="M329 235h88v29h-88z" fill="#754d81" stroke="#261c33" stroke-width="9"/>
      <path d="M338 216h69v24h-69z" fill="#543a67" stroke="#261c33" stroke-width="7"/>
      <path d="M363 214h21v16h-21z" fill="#9f7bbe"/>
      <!-- Ojos cuadrados y nariz clásica -->
      <path d="M342 297h17v12h-17zM394 297h17v12h-17z" fill="#f7f0d5"/><path d="M350 297h8v12h-8M394 297h8v12h-8" fill="#266c4e"/>
      <path d="M358 313h36v56h-36z" fill="#b07a5c" stroke="#3b2a2e" stroke-width="6"/><path d="M363 323h23v29h-23z" fill="#d2a07a"/>
      <path d="M331 376h91v18h-91z" fill="#77495b"/><path d="M353 383h45v14h-45z" fill="#d5ab92"/>
      <!-- Brazos cruzados -->
      <path d="M325 467h99v28h-99z" fill="#b88969" stroke="#322630" stroke-width="8"/><path d="M373 470h46v15h-46z" fill="#d1a17c"/>
      <path d="M338 535h30v37h-30zM392 535h30v37h-30z" fill="#342a3b" stroke="#211c28" stroke-width="7"/>
      <path d="M332 572h46v14h-46zM386 572h45v14h-45z" fill="#211c28"/>
    </g>
    <!-- Bloques de amatista/diamante, maceta y partículas -->
    <g transform="translate(154 480)"><path d="M0 30h93v80H0z" fill="#4a445b" stroke="#191923" stroke-width="8"/><path d="M12 39h21v21H12M42 43h26v12H42M15 77h41v17H15" fill="#6a6174"/>
      <path d="M39 29l23-56 24 56z" fill="#9c6dc7" stroke="#261b38" stroke-width="6"/><path d="M46 21l14-34 12 34z" fill="#d6b1f4"/></g>
    <g class="sparkles" fill="#b5f2a0"><rect x="492" y="221" width="9" height="9"/><rect x="536" y="288" width="8" height="8"/><rect x="158" y="222" width="7" height="7"/><rect x="461" y="350" width="6" height="6"/><rect x="293" y="207" width="6" height="6"/></g>
    <g class="sparkles-delayed" fill="#d9a4fa"><rect x="458" y="188" width="12" height="12"/><rect x="199" y="301" width="9" height="9"/><rect x="563" y="198" width="7" height="7"/><rect x="285" y="350" width="7" height="7"/><rect x="545" y="454" width="8" height="8"/></g>
    <path d="M0 596h760v24H0z" fill="#13131c" opacity=".7"/>
  </svg>
</template>
