import { ms } from '@utils/helper/Metrics';

export const typography = {
  sizes: {
    xs: ms(11),
    sm: ms(13),
    base: ms(15),
    md: ms(17),
    lg: ms(19),
    xl: ms(22),
    xxl: ms(26),
    hero: ms(32),
  },
  weights: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
    heavy: '800' as const,
  },
  lineHeights: {
    tight: 1.2,
    normal: 1.4,
    relaxed: 1.6,
    loose: 1.8,
  },
};
