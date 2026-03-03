import React from 'react';
import { TimelineStop } from './TimelineStop';
import { AttractionCard } from './AttractionCard';
import type { TripStop } from '../../types/trip';

interface TripStopWithAnimation extends TripStop {
  scale?: number;
}

interface TripTimelinePanelProps {
  stops: TripStopWithAnimation[];
  scrollOffset?: number;
}

export const TripTimelinePanel: React.FC<TripTimelinePanelProps> = ({ stops, scrollOffset = 0 }) => {
  return (
    <div className="w-full flex flex-col bg-white">
      {/* Header */}
      <div className="px-8 py-4 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <span className="text-2xl">🗺️</span>
          Your Trip Itinerary
        </h2>
        <p className="text-sm text-gray-500 mt-1">A perfect day in Paris</p>
      </div>

      {/* Timeline Content */}
      <div className="flex-1 overflow-y-scroll overflow-x-hidden px-8" >
        <div className="relative pl-8" style={{ transform: `translateY(${scrollOffset}px)` }}>
          {/* Vertical Timeline Line */}
          <div
            className="absolute left-0 top-0 w-0.5 bg-gray-300"
            style={{ height: `${stops.length * 156 - 24}px` }}
          />

          {/* Timeline Stops and Cards */}
          <div className="relative">
            {stops.map((stop, index) => (
              <div
                key={stop.id}
                className="relative"
                style={{
                  transform: `scale(${stop.scale ?? 1})`,
                  transformOrigin: 'left center',
                }}
              >
                {/* Timeline Stop Icon */}
                <TimelineStop
                  icon={stop.icon}
                  color={stop.color}
                  order={index}
                />

                {/* Attraction Card */}
                <div style={{ marginBottom: index < stops.length - 1 ? '24px' : '0' }}>
                  <AttractionCard
                    image={stop.image}
                    title={stop.title}
                    description={stop.description}
                    time={stop.time}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
