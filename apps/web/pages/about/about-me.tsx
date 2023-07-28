import { RootLayout, AboutLayout } from 'components';
import Lottie from 'react-lottie-player';
import animationData from 'animations/about-sam.json';

export default function AboutPage() {
  return (
    <RootLayout>
      <AboutLayout>
        <div className="grid grid-cols-2 h-[calc(100vh_-_128px)]">
          <div className="flex items-center justify-center">
            <div>
              <h1 className="text-[62px] text-white">About Sam</h1>
              <p className="text-[18px] max-w-[450px]">
                Hi there, Sam is a full-stack web and mobile application
                developer with more than 6 years of work experience in this
                field. As a programmer, Sam is a skilled and knowledgeable
                individual with a passion for creating and improving softwares
                and solving problems. Sam is highly analytical, able to break
                down complex problems into manageable pieces and devise
                efficient solutions.
                <br />
                <br />
                Sam is also a strong problem-solver, able to troubleshoot and
                debug code to ensure that it is functioning as intended. In
                addition to his technical expertise, he is also a strong
                communicator, able to clearly and effectively convey your ideas
                to team members and stakeholders. Sam is a team player, able to
                work well with others and contribute to a positive and
                productive work environment.
                <br />
                <br />
                Overall, Sam can be a valuable asset to any organization, with
                the skills and expertise to drive success in the fast-paced and
                constantly evolving world of technology. Sam&apos;s passion for
                programming and his dedication to continuously learning and
                improving make him an invaluable member of any team.
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <Lottie
              loop
              animationData={animationData}
              play
              style={{ width: 300, height: 300 }}
            />
          </div>
        </div>
      </AboutLayout>
    </RootLayout>
  );
}
