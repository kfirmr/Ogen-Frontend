import {
  CANCELLATION_LABELS,
  CANCELLATION_CHANNELS,
  CANCELLATION_BODY_ROWS,
  CANCELLATION_CHANNEL_COPY,
  type TCancellationChannelType,
} from "../../constants/subscription-cancellation.constants";

import type {
  ICancellationEmail,
  ICancellationRequest,
} from "../../interfaces/subscription-cancellation.interface";

import TextField from "../TextField/TextField";
import GuideModal from "../GuideModal/GuideModal";
import mailIcon from "../../assets/icons/mail.png";
import IconListItem from "../IconListItem/IconListItem";
import { type FC, type ReactNode, useState } from "react";
import { useStyles } from "./CancelSubscriptionPopup.style";
import { validateRequiredText } from "../../utilities/validators";
import { getCancellationTitle } from "../../utilities/subscription-cancellation.utility";

interface ICancelSubscriptionPopupProps {
  onClose: () => void;
  request: ICancellationRequest;
  onSend: (email: ICancellationEmail) => Promise<void>;
}

const CancelSubscriptionPopup: FC<ICancelSubscriptionPopupProps> = ({
  onSend,
  request,
  onClose,
}) => {
  const styles = useStyles();
  const [email, setEmail] = useState(request.email);
  const [isSending, setIsSending] = useState(false);
  const [isBodyValid, setIsBodyValid] = useState(false);
  const [isRecipientValid, setIsRecipientValid] = useState(false);

  const channel = request.channel;
  const channelCopy = CANCELLATION_CHANNEL_COPY[channel.type];
  const isChannelReady: Record<TCancellationChannelType, boolean> = {
    [CANCELLATION_CHANNELS.LINK]: true,
    [CANCELLATION_CHANNELS.PHONE]: true,
    [CANCELLATION_CHANNELS.EMAIL]: isRecipientValid && isBodyValid,
  };

  const renderTarget = (title: string) => (
    <TextField
      readonly
      type="text"
      title={title}
      value={channel.target}
      validator={validateRequiredText}
    />
  );

  const channelFields: Record<TCancellationChannelType, ReactNode> = {
    [CANCELLATION_CHANNELS.EMAIL]: (
      <>
        <TextField
          type="email"
          value={email.recipient}
          setIsValid={setIsRecipientValid}
          title={CANCELLATION_LABELS.RECIPIENT}
          onChange={(recipient) => setEmail({ ...email, recipient })}
          endAdornment={<img alt="" src={mailIcon} style={styles.mailIcon} />}
        />

        <TextField
          multiline
          type="text"
          value={email.body}
          setIsValid={setIsBodyValid}
          rows={CANCELLATION_BODY_ROWS}
          validator={validateRequiredText}
          title={CANCELLATION_LABELS.BODY}
          onChange={(body) => setEmail({ ...email, body })}
        />
      </>
    ),
    [CANCELLATION_CHANNELS.LINK]: renderTarget(CANCELLATION_LABELS.LINK),
    [CANCELLATION_CHANNELS.PHONE]: renderTarget(CANCELLATION_LABELS.PHONE),
  };

  const handleSend = async () => {
    setIsSending(true);

    try {
      await onSend(email);
    } finally {
      setIsSending(false);
      onClose();
    }
  };

  return (
    <GuideModal
      open
      onClose={onClose}
      subtitle={channelCopy.subtitle}
      title={getCancellationTitle(request.subscription.name)}
      secondaryButton={{ text: CANCELLATION_LABELS.CLOSE, onClick: onClose }}
      primaryButton={{
        variant: "warning",
        disabled: !isChannelReady[channel.type],
        onClick: handleSend,
        isLoading: isSending,
        text: channelCopy.action,
      }}
    >
      <div style={styles.fields}>
        <IconListItem
          tone="warning"
          icon={request.subscription.icon}
          title={request.subscription.name}
          subtitle={request.subscription.price}
          trailing={
            <span style={styles.yearlyCost}>{request.yearlyCostLabel}</span>
          }
        />

        {channelFields[channel.type]}
      </div>
    </GuideModal>
  );
};

export default CancelSubscriptionPopup;
