import { Typography } from '@material-ui/core';
import * as React from 'react'

export interface BaseErrorTextProps {
  /**
   * Le texte à afficher
   * @default "Une erreur est survenue"
   */
  text?: string;
}

export type ErrorTextProps = BaseErrorTextProps;

const ErrorText: React.FC<ErrorTextProps> = props => {
  const { text } = props
  return <Typography {...props}>{text}</Typography>
}
ErrorText.defaultProps = {
  text: 'Une erreur est survenue',
  color: 'error',
  variant: 'subtitle2'
}

export default ErrorText
