import { bootstrapApplication } from '@angular/platform-browser';
    import { TimelineOppositeDemo } from './app/timeline-opposite-demo';
    import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

    bootstrapApplication(TimelineOppositeDemo, {
    providers: [provideAnimationsAsync()],
    }).catch((err) => console.error(err));