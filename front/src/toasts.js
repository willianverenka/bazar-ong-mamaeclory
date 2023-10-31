import { toast } from '@zerodevx/svelte-toast'

export const sucesso = m => toast.push(m, {
    theme: {
        '--toastColor': 'mintcream',
        '--toastBackground': 'rgba(72,187,120,0.9)',
        '--toastBarBackground': '#2F855A',
      }
})

export const aviso = m => toast.push(m, { 
    theme: {
    '--toastColor': 'whitesmoke',
    '--toastBackground' : 'rgba(255, 145, 0, 1)',
    '--toastBarBackground': 'rgbargba(217, 83, 0, 1)'
        } 
})

export const erro = m => toast.push(m, { 
    theme: {
    '--toastColor': 'whitesmoke',
    '--toastBackground' : 'rgba(194, 21, 21, 1)',
    '--toastBarBackground': 'rgba(122, 5, 5, 1)'
        } 
})