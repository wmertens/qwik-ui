import {
  component$,
  QwikIntrinsicElements,
  Slot,
  useContext,
  useSignal,
  useVisibleTask$
} from '@builder.io/qwik';
import SelectContextId from './select-context-id';

export type SelectTriggerProps = QwikIntrinsicElements['button'];

export const SelectTrigger = component$((props: SelectTriggerProps) => {
  const selectContext = useContext(SelectContextId);
  const triggerRef = useSignal<HTMLElement>();
  selectContext.triggerRef = triggerRef;

  useVisibleTask$(function setClickHandler({ cleanup }) {
    function clickHandler(e: Event) {
      e.preventDefault();
      selectContext.isExpanded.value = !selectContext.isExpanded.value;
    }
    triggerRef.value?.addEventListener('click', clickHandler);
    cleanup(() => {
      triggerRef.value?.removeEventListener('click', clickHandler);
    });
  });

  useVisibleTask$(function setKeyHandler({ cleanup }) {
    function keyHandler(e: KeyboardEvent) {
      if (e.key === 'Home' || e.key === 'End') {
        e.preventDefault();
      }
      if (
        e.key === 'ArrowDown' ||
        e.key === 'ArrowUp' ||
        e.key === 'Enter' ||
        e.key === ' '
      ) {
        selectContext.isExpanded.value = true;
      }
    }
    triggerRef.value?.addEventListener('keydown', keyHandler);
    cleanup(() => {
      triggerRef.value?.removeEventListener('keydown', keyHandler);
    });
  });

  return (
    <button ref={triggerRef} aria-expanded={selectContext.isExpanded.value} {...props}>
      <Slot />
    </button>
  );
});
