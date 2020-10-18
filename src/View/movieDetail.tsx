import React from 'react';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { MovieDataContent } from '../Service/api/imdb'

const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  });

export interface DialogTitleProps extends WithStyles<typeof styles> {
  id: string;
  children: React.ReactNode;
  onClose: () => void;
}

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

type Props = {
  open: boolean
  setOpen: any
  detail: MovieDataContent | undefined
}

const MovieDetail = (props: Props) => {
  const handleClose = () => {
    props.setOpen(false);
  };
  const movie = props.detail
  return (
    <div>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={props.open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          {movie?.original_title}
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            Popularity: {movie?.popularity}
          </Typography>
          <Typography>
            Vote count: {movie?.vote_count}
          </Typography>
          <Typography>
            Vote average: {movie?.vote_average}
          </Typography>
          <Typography gutterBottom>
            Overview: {movie?.overview}
          </Typography>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default MovieDetail