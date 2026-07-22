import DataGenerator from "./helpers/DataGenerator.js";
import type { Processed } from "./helpers/ProcessRequest.js";
import ProcessRequest from "./helpers/ProcessRequest.js";
import LoadEnv from "./LoadEnv.js";

const GetNowWithOffset = (Offset: number): Date => new Date(Date.now() + Offset);
const GetUntilNextBirthday = (BirthMonth: number, BirthDay: number): number => {
    const Now: Date = GetNowWithOffset(25200000);
    const NextBirthday: Date = new Date(Date.UTC(Now.getUTCFullYear(), BirthMonth - 1, BirthDay) - 25200000);
    
    if(NextBirthday.getTime() <= Date.now())
        NextBirthday.setFullYear(Now.getFullYear() + 1);
    
    return NextBirthday.getTime() - Date.now();
};
const GetBirthdayCountdownString = (Month: number, Day: number): string => {
    const Now = GetNowWithOffset(25200000);

    let LastBirthday = new Date(Now.getUTCFullYear(), Month - 1, Day);

    if(LastBirthday > Now) 
        LastBirthday.setUTCFullYear(LastBirthday.getUTCFullYear() - 1);

    const DaysSinceBirthday = Math.floor((Now.getTime() - LastBirthday.getTime()) / 86400000);

    if(DaysSinceBirthday >= 0 && DaysSinceBirthday < 7) 
        return "It's my birthday :)";

    const DaysLeft = Math.ceil(GetUntilNextBirthday(Month, Day) / 86400000);

    return `${DaysLeft} days left`;
};
const GetAge = (BirthDate: Date): number => {
    const Now: Date = GetNowWithOffset(25200000);
    const HasHadBirthdayThisYear: boolean = 
        Now.getUTCMonth() > BirthDate.getUTCMonth() || 
        (
            Now.getUTCMonth() === BirthDate.getUTCMonth() && 
            Now.getUTCDate() >= BirthDate.getUTCDate()
        )
    ;

    let Age: number = Now.getUTCFullYear() - BirthDate.getUTCFullYear();
    if(!HasHadBirthdayThisYear)
        Age--;

    return Age;
};

const Data = async (): Promise<DataGenerator> => {
    const ProcessedGHData: Processed = await ProcessRequest();
    return new DataGenerator()
        .AddString(Builder => 
            Builder
                .SetName("Title")
                .SetValue("Call me Claire")
        )
        .AddString(Builder => 
            Builder
                .SetName("Stat1")
                .SetValue("Total Stars")
        )
        .AddNumber(Builder => 
            Builder
                .SetName("Stat1Value")
                .SetValue(ProcessedGHData.TotalStars)
        )
        .AddString(Builder => 
            Builder
                .SetName("Stat2")
                .SetValue("Total Commits")
        )
        .AddNumber(Builder => 
            Builder
                .SetName("Stat2Value")
                .SetValue(ProcessedGHData.TotalCommits)
        )
        .AddString(Builder => 
            Builder
                .SetName("Stat3")
                .SetValue("Top Language")
        )
        .AddString(Builder => 
            Builder
                .SetName("Stat3Value")
                .SetValue(ProcessedGHData.TopLanguage)
        )
        .AddString(Builder => 
            Builder
                .SetName("Stat4")
                .SetValue("Until My Birthday")
        )
        .AddString(Builder => 
            Builder
                .SetName("Stat4Value")
                .SetValue(GetBirthdayCountdownString(1, 1))
        )
        .AddString(Builder => 
            Builder
                .SetName("Stat5")
                .SetValue("Age")
        )
        .AddNumber(Builder => 
            Builder
                .SetName("Stat5Value")
                .SetValue(GetAge(new Date(2007, 0, 1)))
        )
        .AddString(Builder => 
            Builder
                .SetName("Subtitle1")
                .SetValue("GitHub Username")
        )
        .AddString(Builder => 
            Builder
                .SetName("Subtitle1Value")
                .SetValue(LoadEnv.GITHUB_USERNAME)
        )
        .AddString(Builder => 
            Builder
                .SetName("Subtitle2")
                .SetValue("Hobby")
        )
        .AddString(Builder => 
            Builder
                .SetName("Subtitle2Value")
                .SetValue("Programming, and overengineering stuff.")
        )
        .AddString(Builder => 
            Builder
                .SetName("MiniProfileStatName")
                .SetValue("Claire Iidea")
        )
        .AddMedia(Builder => 
            Builder
                .SetName("PFPUrl")
                .SetUrl("https://github.com/chara-dreemurr-67/assets/blob/main/assets/Pfp.jpg?raw=true")
        )
        .AddString(Builder => 
            Builder
                .SetName("Stat6")
                .SetValue("TBA")
        )
        .AddString(Builder => 
            Builder
                .SetName("Stat6Value")
                .SetValue("")
        )
        .AddString(Builder => 
            Builder
                .SetName("Subtitle3")
                .SetValue("TBA")
        )
        .AddString(Builder => 
            Builder
                .SetName("Subtitle3Value")
                .SetValue("")
        )
    ;
};

export default Data;