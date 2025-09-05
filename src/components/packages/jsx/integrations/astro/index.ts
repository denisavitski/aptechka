import { aptechkaVite } from '@packages/jsx'
import type { AstroIntegration, AstroRenderer } from 'astro'

function getRenderer(): AstroRenderer {
  return {
    name: 'aptechka',
    clientEntrypoint: 'aptechka/jsx/integrations/astro/client',
    serverEntrypoint: 'aptechka/jsx/integrations/astro/server',
  }
}

export function AstroIntegration(): AstroIntegration {
  return {
    name: 'aptechka',
    hooks: {
      'astro:config:setup': async (e) => {
        e.addRenderer(getRenderer())
        e.updateConfig({
          vite: {
            plugins: [aptechkaVite()],
            optimizeDeps: {
              include: ['aptechka/jsx/integrations/astro/client'],
              exclude: ['aptechka/jsx/integrations/astro/server'],
            },
          },
        })
      },
    },
  }
}
