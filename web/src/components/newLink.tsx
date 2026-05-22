import axios from "axios";
import Text from "./text";
import Input from "./input";
import Button from "./button";
import React, { useState } from "react";
import newLink from "../http/newLink";
import LoadingIcon from "../assets/icons/spinner-gap.svg?react"
import { toast } from "sonner";


const PREFIX = "brev.ly/";

export default function NewLink({onCreate}: {onCreate: () => void}) {
    const [shortLink, setShortLink] = useState("");
    const [originalLink, setOriginalLink] = useState("")
    const [variantOriginalLink, setVariantOriginalLink] = useState<"default" | "active" | "error">("default")
    const [variantShortLink, setVariantShortLink] = useState<"default" | "active" | "error">("default")
    const [errorMessageOriginalLink, setErrorMessageOriginalLink] = useState("")
    const [errorMessageShortLink, setErrorMessageShortLink] = useState("")
    const [subVariantButton, setSubVariantButton] = useState<"default" | "hover" | "disabled">("default")
    const [loading, setLoading] = useState(false)

    const handleOriginalLink = (e: React.ChangeEvent<HTMLInputElement>) => {    
        const value = e.target.value
        setOriginalLink(value)

        if(e.type === "blur"){
            try{
                new URL(value)
                setVariantOriginalLink("default")
            }catch{
                setErrorMessageOriginalLink("Formato do link invalido")
                setVariantOriginalLink("error")
            }
        }
    }

    const handleShortLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value;
        
        if (value.startsWith(PREFIX)) {
            value = value.slice(PREFIX.length);
            setShortLink(value);

            if (/^[a-zA-Z0-9]*$/.test(value)) {
                setVariantShortLink("active")
            }else {
                setErrorMessageShortLink("O link encurtado nao pode ter espacos e caracteres")
                setVariantShortLink("error")
            }
        } else {
            setShortLink("")
            setVariantShortLink("active")
        }
    };

    const handleNewLink = async () => {
        if (originalLink.length > 0 && variantOriginalLink != "error" && shortLink.length > 0 && variantShortLink != "error") {
            try {
                setLoading(true);
                 setSubVariantButton("disabled");
                await newLink({ originalLink, shortLink });
                toast.success("Link cadastrado");
                setOriginalLink("");
                setShortLink("");
                onCreate();
            } catch(error) {
                if(axios.isAxiosError(error)) {
                    if(error.response?.status === 409) {
                        setErrorMessageShortLink("Este link encurtado ja existe");
                        setVariantShortLink("error");
                    }
                }

                toast.error("Falha ao fazer o cadastro")
            } finally {
                setLoading(false);
                setSubVariantButton("default");
            }
        } else {
            if (originalLink.length === 0 || variantOriginalLink === "error") {
                setErrorMessageOriginalLink("Insira um link valido");
                setVariantOriginalLink("error");
            }
            if (shortLink.length === 0 || variantShortLink === "error") {
                setErrorMessageShortLink("Insira um identificador valido");
                setVariantShortLink("error");
            }
        }
    }

    return (
        <div className="bg-white flex flex-col rounded-lg p-6 md:p-8 gap-5 md:gap-6 max-w-95 w-full h-max">
            <Text variant="Text Lg">Novo link</Text>
            <div className="flex flex-col gap-4">
                <Input
                    key="linkOriginal"
                    title="LINK ORIGINAL"
                    placeholder="www.exemplo.com.br"
                    variant={variantOriginalLink}
                    errorMessage={errorMessageOriginalLink}
                    value={originalLink}
                    onChange={(e) => handleOriginalLink(e)}
                    onFocus={() => setVariantOriginalLink("active")}
                    onBlur={(e) => handleOriginalLink(e)}
                />
                <Input
                    key="linkEncurtado"
                    title="LINK ENCURTADO"
                    placeholder={PREFIX}
                    variant={variantShortLink}
                    errorMessage={errorMessageShortLink}
                    value={PREFIX + shortLink}
                    onChange={(e) => handleShortLinkChange(e)}
                    onFocus={() => variantShortLink != "error" && setVariantShortLink("active")}
                    onBlur={() => variantShortLink != "error" && setVariantShortLink("default")}
                />
            </div>
            <Button
                variant="primary"
                subVariant={subVariantButton}
                onMouseEnter={() => !loading && setSubVariantButton("hover")}
                onMouseLeave={() => !loading && setSubVariantButton("default")}
                onClick={() => !loading && handleNewLink()}
            >
                {loading ? (
                    <span className="flex items-center gap-2">Salvando <LoadingIcon className="animate-spin size-6"/></span>
                ) : (
                    "Salvar link"
                )}
            </Button>
        </div>
    );
}