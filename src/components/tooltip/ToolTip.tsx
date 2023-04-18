import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: '#f5f5f9',
      color: 'rgba(0, 0, 0, 0.87)',
      maxWidth: 220,
      fontSize: theme.typography.pxToRem(12),
      border: '1px solid var(--main-color)',
    },
}));

type ToolTipProps = {
    style?: React.CSSProperties;
    title: string;
    description: string;
    children: React.ReactElement<any, any>;
    placement?: "left" | "right" | "right-end" | "bottom" | "top" | "bottom-end" | "bottom-start" | "left-end" | "left-start" | "right-start" | "top-end" | "top-start";
}

const ToolTip = ({title, description, children, placement = 'right-end', style}: ToolTipProps) => {
    return (
        <div>
            <HtmlTooltip
                style={style}
                title={<>
                    <Typography color="inherit">{title}</Typography>
                    <b>{description}</b>
                </>}
                placement={placement}
                children={children}
            />
        </div>
      );
}

export default ToolTip;
  