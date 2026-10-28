<script setup lang="ts">
import * as SectionUi from '~/dependencies/sections/contact'

const props = defineProps<{ content: SectionUi.ContactContent }>()
const {
  ready,
  values,
  errors,
  pending,
  status,
  honey,
  clearError,
  validate,
  submit,
} = useContactForm(props.content.fields, props.content.email)

const iconClasses = {
  email: 'w-[1em] [mask-image:url(/icons/interface/envelope.svg)]',
  linkedin: 'w-[0.875em] [mask-image:url(/icons/interface/linkedin-in.svg)]',
  github: 'w-[0.96875em] [mask-image:url(/icons/interface/github.svg)]',
}
</script>

<template>
  <section
    id="contact"
    class="contact-section bg-ink py-26 text-white print:py-8"
    aria-labelledby="contact-title"
    tabindex="-1"
  >
    <SectionUi.ScrollReveal
      class="contact-layout mx-auto grid w-[calc(100%_-_var(--gutter)*2)] max-w-(--content-width) grid-cols-2 gap-16 mobile-nav:gap-8 phone:grid-cols-1"
    >
      <div class="contact-copy">
        <h2
          id="contact-title"
          class="font-display text-[clamp(2rem,4vw,2.625rem)] leading-[1.1] font-semibold tracking-[-0.045em]"
        >
          {{ content.title }}
        </h2>
        <p class="mt-6 max-w-[42ch] text-pale">{{ content.description }}</p>
        <div class="social-row mt-8 flex flex-wrap gap-4 print:hidden">
          <a
            v-for="link in content.links"
            :key="link.icon"
            :href="link.href"
            class="social-link inline-flex min-h-11 items-center gap-2 rounded-lg border border-lilac bg-ink px-4 py-2 text-[0.8125rem] text-pale no-underline hover:bg-lilac hover:text-ink"
          >
            <span
              :class="iconClasses[link.icon]"
              class="h-[1em] shrink-0 bg-current [mask-position:center] [mask-repeat:no-repeat] [mask-size:contain]"
              aria-hidden="true"
            />
            {{ link.label }}
          </a>
        </div>
      </div>
      <form
        id="contact-form"
        class="contact-form print:hidden"
        :action="SectionUi.getContactAction(content.email)"
        method="post"
        :novalidate="ready"
        :aria-busy="pending"
        @submit.prevent="submit"
      >
        <input
          type="hidden"
          name="_subject"
          :value="SectionUi.contactDelivery.subject"
        />
        <input
          type="hidden"
          name="_template"
          :value="SectionUi.contactDelivery.template"
        />
        <input
          v-model="honey"
          class="hidden"
          type="text"
          name="_honey"
          tabindex="-1"
          autocomplete="off"
          aria-hidden="true"
        />
        <div
          v-for="(field, index) in content.fields"
          :key="field.name"
          class="field"
          :class="index > 0 ? 'mt-6' : undefined"
        >
          <label
            :for="`contact-${field.name}`"
            class="mb-2 block text-[0.8125rem] text-pale"
            >{{ field.label }}</label
          >
          <textarea
            v-if="field.name === 'message'"
            :id="`contact-${field.name}`"
            v-model="values[field.name]"
            :name="field.name"
            :maxlength="field.maxLength"
            required
            :readonly="pending"
            :aria-invalid="errors[field.name] ? 'true' : undefined"
            :aria-describedby="
              errors[field.name] ? `contact-${field.name}-error` : undefined
            "
            class="block min-h-36 w-full resize-y rounded-lg border border-lilac bg-ink px-4 py-3.5 text-base leading-[1.75] text-white"
            @input="clearError(field.name)"
            @blur="validate(field)"
          />
          <input
            v-else
            :id="`contact-${field.name}`"
            v-model="values[field.name]"
            :name="field.name"
            :type="field.type"
            :autocomplete="field.autocomplete"
            :inputmode="field.name === 'email' ? 'email' : undefined"
            :spellcheck="field.name === 'email' ? false : undefined"
            :maxlength="field.maxLength"
            required
            :readonly="pending"
            :aria-invalid="errors[field.name] ? 'true' : undefined"
            :aria-describedby="
              errors[field.name] ? `contact-${field.name}-error` : undefined
            "
            class="block min-h-12 w-full rounded-lg border border-lilac bg-ink px-4 py-3.5 text-base leading-[1.75] text-white"
            @input="clearError(field.name)"
            @blur="validate(field)"
          />
          <p
            v-if="errors[field.name]"
            :id="`contact-${field.name}-error`"
            class="mt-2 text-xs text-pale"
            aria-live="polite"
          >
            {{ errors[field.name] }}
          </p>
        </div>
        <button
          type="submit"
          :disabled="pending"
          class="mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-purple bg-purple px-6 py-3.5 text-sm leading-[1.75] font-semibold whitespace-nowrap text-ink transition-[background-color,color,border-color,transform] duration-300 ease-[ease] hover:border-lilac hover:bg-lilac active:translate-y-0.5 motion-reduce:transition-none motion-reduce:duration-0 disabled:cursor-default disabled:opacity-60"
        >
          {{ pending ? content.sendingLabel : content.submitLabel }}
        </button>
        <p
          v-if="status === 'success'"
          class="mt-4 text-sm text-pale"
          role="status"
        >
          {{ content.successMessage }}
        </p>
        <p
          v-if="status === 'error'"
          class="mt-4 text-sm text-pale"
          role="alert"
        >
          {{ content.errorMessage }}
          <a :href="`mailto:${content.email}`" class="underline"
            >Email me directly.</a
          >
        </p>
        <p class="form-note mt-4 text-xs leading-[1.75] text-pale">
          {{ content.formNote }}
        </p>
        <p v-if="!ready" class="mt-4 text-xs text-pale">
          Continue to the secure submission page to finish sending your message.
        </p>
      </form>
    </SectionUi.ScrollReveal>
  </section>
</template>
