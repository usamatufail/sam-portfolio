import Image from 'next/image';
import styles from './timeline.module.scss';

interface CardData {
  title: string;
  organization: string;
  image: string;
  duration: string;
  active?: boolean;
  activeKey: number;
}

interface TimelineProps {
  data: CardData[];
  setActiveKey: (key: number) => void;
  activeKey: number;
}

export const Timeline = ({ data, setActiveKey, activeKey }: TimelineProps) => {
  return (
    <div className={styles.timeline}>
      <div className={styles.outer}>
        {data.map(data => {
          return (
            <div className={styles.card} key={data.activeKey}>
              <div className={styles.info}>
                <div
                  onClick={() => setActiveKey(data.activeKey)}
                  className={`${styles.title} ${
                    activeKey === data.activeKey ? styles.active : ''
                  } flex items-center gap-[12px] cursor-pointer select-none`}
                >
                  <Image
                    src={data.image}
                    alt={data.title}
                    width={40}
                    height={40}
                  />

                  <div className="flex flex-col gap-[1px]">
                    <h3 className="mb-[5px]">{data.title}</h3>
                    <h4 className="text-white text-[12px]">
                      {data.organization}
                    </h4>
                    <h4 className="text-white text-[12px]">{data.duration}</h4>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
