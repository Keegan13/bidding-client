import LinearProgress from '@material-ui/core/LinearProgress';
import { lighten, withStyles } from '@material-ui/core/styles';

const LinearProgressBar = withStyles({
    root: {
        height: 17,
        backgroundColor: lighten('#ffffff', 0.5),
    },
    bar: {
        backgroundColor: '#cccccc'
    },
})(LinearProgress);

export default LinearProgressBar;