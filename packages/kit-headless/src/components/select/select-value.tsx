import {
  component$,
  useContext,
  type PropsOf,
  useComputed$,
  Slot,
} from '@builder.io/qwik';

import SelectContextId from './select-context';

type SelectValueProps = PropsOf<'span'> & {
  /**
   * Optional text displayed when no option is selected.
   */
  placeholder?: string;
};

export const SelectValue = component$((props: SelectValueProps) => {
  const { placeholder, ...rest } = props;

  const context = useContext(SelectContextId);
  if (!context.optionsSig.value) return;

  const displayStrSig = useComputed$(() => {
    if (context.multiple) {
      return <Slot />;
    }

    if (context.selectedIndexesSig.value[0] !== null) {
      return context.optionsSig.value[context.selectedIndexesSig.value[0]].displayValue;
    } else {
      return placeholder;
    }
  });

  return (
    <span
      data-open={context.isListboxOpenSig.value ? '' : undefined}
      data-closed={!context.isListboxOpenSig.value ? '' : undefined}
      data-value
      {...rest}
    >
      {displayStrSig.value}
    </span>
  );
});
