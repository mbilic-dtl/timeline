import {
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { ImportsModule } from './imports';

interface EventItem {
  id?: number;
  status?: string;
  hour?: string;
  icon?: string;
  color?: string;
  image?: string;
  downtime?: DowntimeModel[];
}

interface DowntimeModel {
  id?: number;
  startTime?: string;
  duration?: number;
  grouping?: string;
  description?: string;
  comment?: string;
  color?: string;
}

@Component({
  selector: 'timeline-opposite-demo',
  templateUrl: './timeline-opposite-demo.html',
  standalone: true,
  imports: [ImportsModule],
})
export class TimelineOppositeDemo implements OnInit {
  @ViewChildren('downtime') downtime: QueryList<ElementRef>;

  events: EventItem[];

  downtimes: DowntimeModel[] = [
    {
      startTime: '07:30',
      duration: 15,
      grouping: 'Planned DT',
      description: 'Break time',
      comment: null,
      color: '#0276B6',
    },
    {
      startTime: '09:15',
      duration: 30,
      grouping: 'Unable to run',
      description: 'Reel change',
      comment: null,
      color: '#318C50',
    },
    {
      startTime: '10:20',
      duration: 10,
      grouping: 'Leaflet',
      description: 'Jam',
      comment: 'Leaflet jammed',
      color: '#F18F04',
    },
    {
      startTime: '11:00',
      duration: 15,
      grouping: 'Mould',
      description: 'Mould problem',
      comment: 'damaged',
      color: '#E24040',
    },
    {
      startTime: '12:10',
      duration: 10,
      grouping: 'Heat chill',
      description: 'Heater problem',
      comment: 'malfuntion',
      color: '#318C50',
    },
    {
      startTime: '13:30',
      duration: 20,
      grouping: 'Unable to run',
      description: 'Meeting',
      comment: null,
      color: '#E24040',
    },
    {
      startTime: '14:15',
      duration: 5,
      grouping: 'System',
      description: 'Data collection fault',
      comment: 'Connection problem',
      color: '#E24040',
    },
    {
      startTime: '14:30',
      duration: 15,
      grouping: 'Thermo',
      description: 'Jam',
      comment: 'Jam',
      color: '#318C50',
    },
  ];

  constructor() {
    this.events = [
      {
        id: 1,
        status: 'Ordered',
        hour: '07:00',
        icon: 'pi pi-shopping-cart',
      },
      {
        id: 2,
        status: 'Processing',
        hour: '08:00',
        icon: 'pi pi-cog',
      },
      {
        id: 3,
        status: 'Shipped',
        hour: '09:00',
        icon: 'pi pi-shopping-cart',
      },
      {
        id: 4,
        status: 'Delivered',
        hour: '10:00',
        icon: 'pi pi-check',
      },
      {
        id: 5,
        status: 'Delivered',
        hour: '11:00',
        icon: 'pi pi-check',
      },
      {
        id: 6,
        status: 'Delivered',
        hour: '12:00',
        icon: 'pi pi-check',
      },
      {
        id: 7,
        status: 'Delivered',
        hour: '13:00',
        icon: 'pi pi-check',
      },
      {
        id: 8,
        status: 'Delivered',
        hour: '14:00',
        icon: 'pi pi-check',
      },
      {
        id: 9,
        status: 'Delivered',
        hour: '15:00',
        icon: 'pi pi-check',
      },
    ];
  }

  ngOnInit(): void {
    this.mapEventsAndDowntime();
  }

  // map downtimes to hour buckets
  mapEventsAndDowntime() {
    this.downtimes.map((downtime) => {
      this.events.map((ev) => {
        if (downtime.startTime.split(':', 1)[0] === ev.hour.split(':', 1)[0]) {
          !!ev.downtime
            ? ev.downtime.push(downtime)
            : (ev.downtime = [downtime]);
        }
      });
    });
  }

  setPosition(downtime: any) {
    return (Number(downtime?.startTime.split(':', 2)[1]) / 60) * 100 + '%';
  }

  setMarkerWidth(duration: number, index: number) {
    const width = this.downtime?.get(index - 1).nativeElement.clientWidth;
    const marker = duration / 60;

    return marker * width + 'px';
  }

  setColor(color: string) {
    return color + '20';
  }
}
