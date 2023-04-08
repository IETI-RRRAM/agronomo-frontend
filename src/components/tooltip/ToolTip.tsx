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
    title: string;
    description: string;
    children: React.ReactElement<any, any>;
}

const ToolTip = ({title, description, children}: ToolTipProps) => {
    return (
        <div>
            <HtmlTooltip

                title={<>
                    <Typography color="inherit">{title}</Typography>
                    <b>{description}</b>
                </>}
                placement='right-end'
                children={children}
            />
        </div>
      );
}

export default ToolTip;
  