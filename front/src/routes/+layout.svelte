<script>
    import { SvelteToast } from '@zerodevx/svelte-toast'
    import Navbar from '../Navbar.svelte'

  
    // Optionally set default options here
    const options = {
  duration: 6000,       // duration of progress bar tween to the `next` value
  initial: 1,           // initial progress bar value
  next: 0,              // next progress value
  pausable: false,      // pause progress bar tween on mouse hover
  dismissable: true,    // allow dismiss with close button
  reversed: false,      // insert new toast to bottom of stack
  intro: { x: 256 },    // toast intro fly animation settings
  theme: {},            // css var overrides
  classes: []           // user-defined classes
}
  </script>
  <SvelteToast {options} />

  <main>
    <Navbar />
    <!-- Your layout content, e.g., navigation, header, etc. -->
    <slot>
    </slot> <!-- This slot will receive the page content -->
    <!-- Other layout content -->
  </main>

  <style>
    
  </style>
