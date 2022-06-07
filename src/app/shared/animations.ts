import { animate, animation, state, style, transition, trigger } from '@angular/animations';

export const moveToCanterAnimation = animation(
    [
        state('start',
            style({
                transform: 'translateX(0%)',
            })
        ),
        state('center',
            style({
                transform: '{{transform}}',
            }), { params: { transform: '0%' } }
        ),

        transition('start <=> center', [
            animate('500ms ease-in-out')
        ]),
    ],
    { params: { transform: '100ms' } }
);

