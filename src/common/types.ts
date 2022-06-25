export type FilterOptions = {
    userName: string;
    startDate: Date;
    endDate: Date;
}

export type JsonModel = {
    participants: Participant[];
    messages: Message[];
}

export type Participant = {
    name: string;
}

export type Message = {
    sender_name: string;
    timestamp_ms: number;
    content?: string;
    call_duration?: number;
    type: string;
    is_unsent: boolean;
    is_taken_down: boolean;
    bumped_message_metadata: BumpState;
    photos?: CommonMediaModel[];
    share?: ShareModel;
    videos?: VideoModel[];
    audio_files?: CommonMediaModel[];
    files?: CommonMediaModel[];
}

type BumpState = {
    is_bumped: boolean;
    bumped_message?: string;
}

type CommonMediaModel = {
    uri: string;
    creation_timestamp: number;
}

type ShareModel = {
    link: string;
}

type VideoModel = CommonMediaModel & {
    thumbnail: ThumbnailModel;
}

type ThumbnailModel = {
    uri: string;
}